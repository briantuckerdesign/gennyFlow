import { captureImages } from "./capture-images";
import { downloadImages } from "./download-images";
import {
  captureAttribute,
  defaultSettings,
  wrapperAttribute,
} from "./settings";
import {
  closeLoader,
  determineSettings,
  getCaptureElements,
  initLoader,
} from "./utils";

/**
 * Initializes and runs the capture process for elements within a specified wrapper.
 * It queries the DOM for the wrapper and capture elements using the provided selectors.
 * If the selectors are not provided, it falls back to default attributes.
 * It then applies settings, prepares the elements for capture, and triggers the capture process.
 *
 * @param {string} [wrapperSelector=wrapperAttribute] - The CSS selector for the wrapper element.
 * @param {string} [captureSelector=captureAttribute] - The CSS selector for the elements to capture.
 * @returns {void} Returns early if the required elements are not found in the DOM.
 */

export async function gennyFlow(
  wrapperSelector = wrapperAttribute,
  captureSelector = captureAttribute
) {
  try {
    // Initialize optional user-facing loading screen
    const loaderEnabled = initLoader(); // Returns boolean.

    // Get array of elements to be captured
    const captureElements = await getCaptureElements(
      wrapperSelector,
      captureSelector,
      loaderEnabled
    );

    // Determine settings based on order of precedence (highest to lowest priority)
    // User input -> wrapper attributes -> default settings
    // Returns object
    let settings = await determineSettings(
      defaultSettings,
      wrapperSelector,
      loaderEnabled
    );

    // Captures image and returns array of tuples: [dataURL,fileName]
    const images = await captureImages(
      captureElements,
      settings,
      loaderEnabled
    );
    console.log(images);

    await downloadImages(images, settings, loaderEnabled);

    closeLoader();
  } catch (error) {
    console.error(error);
    closeLoader();
  }
}
