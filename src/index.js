import { gennyFlow } from "./gennyFlow";
import { triggerAttribute } from "./settings";

module.exports.gennyFlow = gennyFlow;

/**
 * 1. Pushes gennyFlow function to window for access by other js scripts
 * 2. Creates event listener for a click on trigger element.
 *    On click. runs gennyFlow using the default wrapper and capture selectors.
 *
 * Default settings found in ./settings
 */

window.gennyFlow = gennyFlow;

const trigger = document.querySelector(triggerAttribute);

if (trigger) {
  trigger.addEventListener("click", () => gennyFlow());
}
