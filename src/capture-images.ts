import { runCorsProxy } from "./cors-proxy";
import { nodesToIgnore, prepareIgnoredNodes } from "./utils/ignore-items";
import { getItemOptions } from "./get-options";
import * as htmlToImage from "html-to-image";
import { updateLoadingMessage } from "./utils";

/**
 * Asynchronously captures images from a set of DOM elements using specified options.
 *
 *
 * This function is designed to capture images from a collection of elements. It first initializes
 * a CORS proxy and prepares nodes that should be ignored during the image capture process. Then, for
 * each element in the `captureElements` array, it captures an image using the `captureImage` function
 * with options tailored to each element. The function handles these operations asynchronously and
 * collects all the captured images in an array.
 *
 * @param {Object} options - An object containing global options for image capture.
 * @param {Array<HTMLElement>} captureElements - An array of DOM elements from which images will be captured.
 * @returns {Promise<Array>} A promise that resolves to an array of captured images.
 *
 */
export async function captureImages(options, captureElements) {
  // When enabled, replaces urls with proxied ones to bypass CORS errors.
  await runCorsProxy(options);

  // Backwards compatible node ignoring from html2canvas
  await prepareIgnoredNodes();

  // Gets array of tuples representing images, see captureImage() documentation for more info
  const images = await Promise.all(
    captureElements.map((element, index) =>
      captureImage(element, getItemOptions(element, options, index + 1))
    )
  );

  return images;
}

/**
 * Asynchronously captures an image from a DOM element with specific options.
 *
 * This function is responsible for capturing an image of the provided DOM element. It updates a
 * loading message based on the 'slug' property in the options. The image capture is then performed
 * using the 'htmlToImage' library, with settings tailored according to the provided options. The function
 * supports different image formats and handles quality and scaling. The result is an image encoded
 * as a data URL along with its filename.
 *
 * @param {HTMLElement} element - The DOM element from which the image is to be captured.
 * @param {Object} options - An object containing options for the capture process. It includes properties
 *                           like 'slug', 'format', 'quality', 'scale', and 'loaderEnabled'.
 * @returns {Promise<[string, string]>} A promise that resolves to a tuple: [dataURL, fileName].
 *                                      'dataURL' is the base64 encoded image, and 'fileName' is the name of the image file.
 *
 */

/** HTML-TO-IMAGE VERSION */
async function captureImage(element, options) {
  await updateLoadingMessage(
    `Capturing ${options.slug}`,
    options.loaderEnabled
  );

  let dataURL = "";
  // Final settings for capturing images.
  let htmlToImageOptions = {
    // Ensure quality is a number
    quality: parseFloat(options.quality),
    // Ensure scale is a number
    pixelRatio: parseFloat(options.scale),
    // Nodes to not capture
    filter: nodesToIgnore,
  };

  // Captures image based on format
  switch (options.format.toLowerCase()) {
    case "jpg":
    case "jpeg":
      dataURL = await htmlToImage.toJpeg(element, htmlToImageOptions);
      options.fileName = `${options.slug}.jpg`;
      break;
    case "png":
    default:
      dataURL = await htmlToImage.toPng(element, htmlToImageOptions);
      options.fileName = `${options.slug}.png`;
      break;
  }
  const image: [string, string] = [dataURL, options.fileName];

  // returns image stored in tuple. [dataURL, fileName]
  return image;
}
