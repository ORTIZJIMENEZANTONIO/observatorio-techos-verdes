import { b as useRuntimeConfig } from "../server.mjs";
import { u as useAuthStore } from "./auth-5u7f_0sK.js";
function useApi() {
  const config = useRuntimeConfig();
  const auth = useAuthStore();
  async function apiFetch(path, opts = {}) {
    const headers = {
      ...opts.headers || {}
    };
    if (auth.token) {
      headers["Authorization"] = `Bearer ${auth.token}`;
    }
    try {
      return await $fetch(`${config.public.apiBaseUrl}${path}`, {
        ...opts,
        headers
      });
    } catch (error) {
      if (error?.statusCode === 401 || error?.status === 401) {
        auth.logout();
      }
      throw error;
    }
  }
  return { apiFetch };
}
export {
  useApi as u
};
//# sourceMappingURL=useApi-c2WXwWRZ.js.map
