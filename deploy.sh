#!/usr/bin/env bash
# deploy.sh — empaqueta + sube + builda + reinicia el observatorio en producción
#
# Uso:
#   ./deploy.sh <password>          # pasa el password como argumento
#   ./deploy.sh                     # pide el password de forma interactiva (oculto)
#
# Sin dependencias externas: usa `expect` que viene preinstalado en macOS.
# (Si prefieres sshpass: `brew install hudochenkov/sshpass/sshpass` y el
# script lo usa automáticamente por ser más robusto.)
#
# Seguridad: pasar el password como argumento aparece en `ps aux` y en el
# history de la shell. Recomendado: omitir el argumento (lo pide oculto) o
# usar claves SSH (`ssh-copy-id root@72.62.200.124`) y eliminar dependencia.

set -euo pipefail

# ── Config ──────────────────────────────────────────────────────────────
readonly SRV_USER="root"
readonly SRV_HOST="72.62.200.124"
readonly SRV_DST="/var/www/cercu-frontend/observatorio"
readonly LOCAL_TAR="/tmp/techos.tar.gz"
readonly PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ── Colores ─────────────────────────────────────────────────────────────
readonly C_RESET='\033[0m'
readonly C_DIM='\033[2m'
readonly C_BLUE='\033[34m'
readonly C_GREEN='\033[32m'
readonly C_YELLOW='\033[33m'
readonly C_RED='\033[31m'

log()  { printf "${C_BLUE}→${C_RESET} %s\n" "$*"; }
ok()   { printf "${C_GREEN}✓${C_RESET} %s\n" "$*"; }
warn() { printf "${C_YELLOW}⚠${C_RESET} %s\n" "$*"; }
err()  { printf "${C_RED}✗${C_RESET} %s\n" "$*" >&2; }

# ── Detectar herramienta de auto-password ───────────────────────────────
AUTH_TOOL=""
if command -v sshpass >/dev/null 2>&1; then
  AUTH_TOOL="sshpass"
elif command -v expect >/dev/null 2>&1; then
  AUTH_TOOL="expect"
else
  err "Ni sshpass ni expect están disponibles."
  err "  macOS debería traer expect por default — revisa tu PATH."
  err "  Alternativa: brew install hudochenkov/sshpass/sshpass"
  err "  Mejor aún: usa claves SSH (ssh-copy-id ${SRV_USER}@${SRV_HOST})"
  exit 1
fi

# ── Password ────────────────────────────────────────────────────────────
if [ $# -ge 1 ]; then
  SSH_PASS="$1"
else
  printf "Password SSH para ${SRV_USER}@${SRV_HOST}: "
  read -rs SSH_PASS
  echo ""
fi

if [ -z "${SSH_PASS:-}" ]; then
  err "Password vacío. Aborto."
  exit 1
fi

# ── Helpers que abstraen sshpass / expect ───────────────────────────────
# El password se inyecta sin que aparezca en `ps` (sshpass via env var,
# expect via stdin heredoc — el password queda en memoria de expect pero
# no en process args).

scp_to_server() {
  local src="$1"
  local dst="$2"
  if [ "$AUTH_TOOL" = "sshpass" ]; then
    SSHPASS="$SSH_PASS" sshpass -e scp -o StrictHostKeyChecking=accept-new "$src" "${SRV_USER}@${SRV_HOST}:${dst}"
  else
    expect <<EOF >/dev/null
log_user 0
set timeout 600
spawn scp -o StrictHostKeyChecking=accept-new "$src" "${SRV_USER}@${SRV_HOST}:${dst}"
expect {
  -re "yes/no" { send "yes\r"; exp_continue }
  -re "(P|p)assword:" { send -- "$SSH_PASS\r"; exp_continue }
  timeout { exit 2 }
  eof
}
catch wait result
exit [lindex \$result 3]
EOF
  fi
}

ssh_run() {
  local cmd="$1"
  if [ "$AUTH_TOOL" = "sshpass" ]; then
    SSHPASS="$SSH_PASS" sshpass -e ssh -o StrictHostKeyChecking=accept-new "${SRV_USER}@${SRV_HOST}" "$cmd"
  else
    expect <<EOF
log_user 1
set timeout 1800
spawn ssh -o StrictHostKeyChecking=accept-new "${SRV_USER}@${SRV_HOST}" "$cmd"
expect {
  -re "yes/no" { send "yes\r"; exp_continue }
  -re "(P|p)assword:" { send -- "$SSH_PASS\r"; exp_continue }
  timeout { exit 2 }
  eof
}
catch wait result
exit [lindex \$result 3]
EOF
  fi
}

log "Auth tool: $AUTH_TOOL"

# ── 1. Empaquetar (sin AppleDouble ni metadata macOS) ───────────────────
cd "$PROJECT_ROOT"
log "Empacando ${PROJECT_ROOT} → ${LOCAL_TAR}"

# COPYFILE_DISABLE=1 evita que macOS meta archivos `._*` en el tar.
# --no-xattrs + --no-mac-metadata son flags de bsdtar (default en macOS).
COPYFILE_DISABLE=1 tar \
  --no-xattrs --no-mac-metadata \
  --exclude='node_modules' \
  --exclude='.nuxt' \
  --exclude='.output' \
  --exclude='.git' \
  --exclude='.DS_Store' \
  --exclude='._*' \
  --exclude='test-results' \
  --exclude='playwright-report' \
  --exclude='coverage' \
  --exclude='*.log' \
  -czf "$LOCAL_TAR" .

SIZE=$(du -h "$LOCAL_TAR" | awk '{print $1}')
ok "Tar creado: ${SIZE}"

# ── 2. Subir al servidor ────────────────────────────────────────────────
log "Subiendo a ${SRV_USER}@${SRV_HOST}:${SRV_DST}/"
scp_to_server "$LOCAL_TAR" "${SRV_DST}/techos.tar.gz"
ok "Subida completa"

# ── 3. Extraer, limpiar, instalar, buildear, reiniciar ──────────────────
log "Build + restart remoto…"

# Un solo comando concatenado (sin saltos de línea) para que ningún shell
# lo parta. El \ permite legibilidad local pero el resultado es una sola
# línea para el remoto.
ssh_run "cd ${SRV_DST} && tar -xzf techos.tar.gz && rm techos.tar.gz && find . -name '._*' -delete && find . -name '.DS_Store' -delete && yarn cache clean && yarn install && npm run build && pm2 restart observatorio"

ok "Build remoto y restart completos"

# ── 4. Cleanup local ────────────────────────────────────────────────────
rm -f "$LOCAL_TAR"
unset SSH_PASS

ok "Deploy listo — observatorio.cercu.com.mx debería reflejar los cambios"
printf "${C_DIM}Tip: revisa logs con \`./deploy.sh logs\` (o pm2 logs observatorio --lines 50)${C_RESET}\n"
