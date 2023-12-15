import { gennyFlow } from "./gennyFlow";
import { triggerAttribute } from "./settings";

// Only attach gennyFlow to window if window is defined (e.g., in a browser environment)
if (typeof window !== "undefined") {
  (window as any).gennyFlow = gennyFlow;
}

// Listens for trigger click after DOM loads
document.addEventListener("DOMContentLoaded", (event) => {
  const trigger = document.querySelector(triggerAttribute);

  if (trigger) {
    trigger.addEventListener("click", () => gennyFlow());
  }
});

export { gennyFlow };
