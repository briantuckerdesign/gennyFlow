import { gennyFlow } from "./gennyFlow";

// Only attach gennyFlow to window if window is defined (e.g., in a browser environment)
if (typeof window !== "undefined") {
  (window as any).gennyFlow = gennyFlow;
}

// Listens for trigger click after DOM loads
document.addEventListener("DOMContentLoaded", (event) => {
  const trigger = document.querySelector("[gf=trigger]");

  if (trigger) {
    trigger.addEventListener("click", () => gennyFlow());
  }
});

export { gennyFlow };
