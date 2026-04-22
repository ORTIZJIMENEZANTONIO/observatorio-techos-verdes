import { defineStore, skipHydrate } from "pinia";
import { ref, computed } from "vue";
import { n as navigateTo, b as useRuntimeConfig } from "../server.mjs";
const useAuthStore = defineStore("auth", () => {
  const token = ref(null);
  const admin = ref(null);
  const isAuthenticated = computed(() => !!token.value);
  function loadFromStorage() {
    return;
  }
  async function login(email, password) {
    const config = useRuntimeConfig();
    const res = await $fetch(
      `${config.public.apiBaseUrl}/observatory/auth/login`,
      { method: "POST", body: { email, password } }
    );
    token.value = res.data.accessToken;
    admin.value = res.data.admin;
  }
  function logout() {
    token.value = null;
    admin.value = null;
    navigateTo("/admin/login");
  }
  return {
    token: skipHydrate(token),
    admin: skipHydrate(admin),
    isAuthenticated,
    login,
    logout,
    loadFromStorage
  };
});
export {
  useAuthStore as u
};
//# sourceMappingURL=auth-5u7f_0sK.js.map
