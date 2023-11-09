import { captureAndDownloadImages } from "./captureAndDownloadImages";
import { captureAttribute, wrapperAttribute } from "./settings";
import { defaultSettings } from "./settings";
import { initLoader, updateLoader } from "./utils";
const { version } = require("../package.json");

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
  console.group("gennyFlow");
  try {
    // Check for the presence of the wrapper element in the DOM.
    if (!document.querySelector(wrapperSelector)) {
      console.error(
        `gennyFlow Error: No wrapper found. Add a wrapper using custom attribute: ${wrapperSelector}`
      );
      return;
    }
    // Check for the presence of the capture elements in the DOM.
    if (!document.querySelector(captureSelector)) {
      console.error(
        `gennyFlow Error: No capture items found. Add a capture element inside the wrapper using custom attribute: ${captureSelector}`
      );
      return;
    }

    // Gather all elements within the wrapper that need to be captured.
    const listOfCaptureElements = Array.from(
      document.querySelectorAll(`${wrapperSelector} ${captureSelector}`)
    );

    // Initialize the loader and update the user on the process.
    let loaderStatus = initLoader();
    updateLoader(
      `Capturing ${listOfCaptureElements.length} items...`,
      loaderStatus
    );

    // Log the running version and number of items being processed.
    console.log(`
    gennyFlow ${version}
    Running on ${listOfCaptureElements.length} items.  
    `);

    // Determine the settings for the capture process based on a set order of precedence.
    //
    // Order of Precedence
    // 1. Setting declared on gf="capture" element
    //        Example: An element has both "gf=capture" and "gf-scale=2"
    //                 The item would export with a scale of 2 no matter what higher-level settings were set.
    // 2. Setting declared by html user input
    //        Example: An html input with attribute "gf=scale-input"
    //                 <input gf="scale-input" value="2">
    // 3. Value from the gf="wrapper" element (this logic happens later in the code)
    //        Example: The wrapper element with gf="wrapper" also has "gf-scale=2"
    //                 This scale is applied to all captures inside of the wrapper unless overruled by 1 or 2.
    // 4. Default setting from defaultSettings in settings.js
    const settings = {};
    Object.keys(defaultSettings).forEach((settingKey) => {
      const setting = defaultSettings[settingKey];
      let variableName = setting.variableName;
      let userValue = null;
      if (document.querySelector(`[gf="${setting.attribute}-input"]`)) {
        userValue = document.querySelector(
          `[gf="${setting.attribute}-input"]`
        ).value;
      }
      let wrapperValue = null;
      if (
        document
          .querySelector(`[gf="wrapper"]`)
          .getAttribute(`gf-${setting.attribute}`)
      ) {
        wrapperValue = document
          .querySelector(`[gf="wrapper"]`)
          .getAttribute(`gf-${setting.attribute}`);
      }
      let variableValue = userValue || wrapperValue || setting.default;
      settings[variableName] = variableValue;
    });

    // Exclude elements marked for ignore from the capture process.
    const ignoreElements = document.querySelectorAll('[gf="ignore"]');
    ignoreElements.forEach((element) => {
      element.setAttribute("data-html2canvas-ignore", "true");
    });

    // Execute the capture and download process for each element.
    await captureAndDownloadImages(
      listOfCaptureElements,
      defaultSettings,
      settings,
      loaderStatus
    );
    console.groupEnd;
  } catch (error) {
    console.error("Error setting attributes:", error);
  }
}
