// PM2 — Observatorio de Techos Verdes
// Agregar esta entrada al ecosystem.config.cjs de cercu-frontend
module.exports = {
  apps: [
    {
      name: 'techos-verdes',
      cwd: '/var/www/cercu-frontend/observatorio',
      script: '.output/server/index.mjs',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
        NUXT_PUBLIC_DATA_MODE: 'api',
        NUXT_PUBLIC_API_BASE_URL: 'https://observatorio.cercu.com.mx/api/v1',
        NUXT_PUBLIC_OBSERVATORY: 'techos-verdes',
      },
      max_memory_restart: '200M',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: '/var/log/pm2/techos-verdes-error.log',
      out_file: '/var/log/pm2/techos-verdes-out.log',
    },
  ],
};
