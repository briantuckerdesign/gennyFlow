import { gennyFlow } from "./gennyFlow";
import { triggerAttribute } from "./settings";

// Only attach gennyFlow to window if window is defined (e.g., in a browser environment)
if (typeof window !== "undefined") {
  window.gennyFlow = gennyFlow;
}

// Assuming this script runs in the browser as it's manipulating the DOM
document.addEventListener("DOMContentLoaded", (event) => {
  const trigger = document.querySelector(triggerAttribute);

  if (trigger) {
    trigger.addEventListener("click", () => gennyFlow());
  }
});

export { gennyFlow };
