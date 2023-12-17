import { closeLoader, initLoader } from "./utils";
import { determineOptions } from "./get-options";
import { getCaptureElements } from "./get-capture-element";
import { captureImages } from "./capture-images";
import { downloadImages } from "./download-images";

export async function gennyFlow(userOptions = {}) {
  const defaultOptions = {
    // capture options
    format: "png",
    quality: 1,
    scale: 1,
    inlineSVGs: true,
    // zip label options
    zipName: "images",
    includeDateZip: false,
    includeScaleZip: false,
    // image label options
    includeDateImg: false,
    includeScaleImg: true,
    wrapperSelector: '[gf="wrapper"]',
    captureSelector: '[gf="capture"]',
    corsProxyBaseURL: null,
    loaderEnabled: false,
  };

  let options = { ...defaultOptions, ...userOptions };

  try {
    // Initialize optional user-facing loading screen
    options.loaderEnabled = initLoader(); // Returns boolean.

    // Overwrites default options from various inputs based on order of precedence
    options = await determineOptions(options);

    // Get array of elements to be captured
    const captureElements = await getCaptureElements(options);

    // Captures image and returns array of tuples: [dataURL,fileName]
    const images = await captureImages(options, captureElements);

    await downloadImages(images, options);

    closeLoader();
  } catch (error) {
    console.error(error);
    closeLoader();
  }
}
