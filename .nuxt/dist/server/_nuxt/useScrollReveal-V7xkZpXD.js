import { ref } from "vue";
function useScrollReveal(options = {}) {
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -60px 0px",
    stagger = false,
    once = true
  } = options;
  const revealRef = ref(null);
  return { revealRef };
}
export {
  useScrollReveal as u
};
//# sourceMappingURL=useScrollReveal-V7xkZpXD.js.map
