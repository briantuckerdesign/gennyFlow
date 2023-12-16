import { isVisible } from "./is-visible";
import { updateLoadingMessage } from "./loader";

/**
 * Asynchronously retrieves elements within a specified wrapper based on a given selector.
 *
 * This function is designed to find elements within a specific wrapper element in the DOM.
 * It checks for the existence of both the wrapper and the desired elements inside it.
 * If either the wrapper or the elements are not found, it logs an error and exits.
 *
 * @async
 * @param {string} wrapperSelector - The CSS selector for the wrapper element.
 * @param {string} captureSelector - The CSS selector for the elements to be captured within the wrapper.
 * @returns {Promise<Element[]>} A promise that resolves with an array of the captured DOM elements.
 *   Returns an empty array if either the wrapper or the capture elements are not found.
 */
export async function getCaptureElements(
  wrapperSelector: string,
  captureSelector: string,
  loaderEnabled: boolean
): Promise<Element[]> {
  updateLoadingMessage("Searching for items to capture...", loaderEnabled);

  if (!document.querySelector(wrapperSelector)) {
    console.error("gennyFlow: No wrapper found.");
    return [];
  }
  if (!document.querySelector(captureSelector)) {
    console.error("gennyFlow: No capture items found in the wrapper.");
    return [];
  }
  const elements = Array.from(
    document.querySelectorAll(`${wrapperSelector} ${captureSelector}`)
  );
  // Filter out elements that are not visible
  const visibleElements = elements.filter((element) => isVisible(element));

  return visibleElements;
}
