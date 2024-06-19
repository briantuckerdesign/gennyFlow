import * as types from "./types";
import * as htmlToImage from "html-to-image";
import { runCorsProxy } from "./cors-proxy";
import { ignoreFilter } from "./utils/ignore-items";
import { getItemOptions } from "./get-options";

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
export async function captureImages(
  options: types.Options,
  captureElements
): Promise<types.Image[]> {
  // When enabled, replaces urls with proxied ones to bypass CORS errors.
  await runCorsProxy(options);

  // Gets array of tuples representing images, see captureImage() documentation for more info
  const images = await Promise.all(
    captureElements.map((element, index) =>
      captureImage(
        element,
        getItemOptions(element, options, index + 1),
        ignoreFilter(options)
      )
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

export async function captureImage(
  element,
  options: types.ItemOptions,
  ignoreFilter
): Promise<types.Image> {
  options.slug = ensureUniqueSlug(options.slug);

  let dataURL = "";
  // Final settings for capturing images.
  let htmlToImageOptions = {
    // Ensure quality is a number
    quality: options.image.quality,
    // Ensure scale is a number
    pixelRatio: parseFloat(options.image.scale),
    // Function that returns false if the element should be ignored
    // filter: ignoreFilter,
  };

  // Captures image based on format
  switch (options.image.format.toLowerCase()) {
    case "jpg":
      dataURL = await htmlToImage.toJpeg(element, htmlToImageOptions);
      options.fileName = `${options.slug}.jpg`;
      break;
    case "png":
    default:
      dataURL = await htmlToImage.toPng(element, htmlToImageOptions);
      options.fileName = `${options.slug}.png`;
      break;
  }
  const image: types.Image = [dataURL, options.fileName];

  // returns image stored in tuple. [dataURL, fileName]
  return image;
}

let usedSlugs: any = [];

function ensureUniqueSlug(slug: string): string {
  if (usedSlugs.includes(slug)) {
    let counter = 1;
    let newSlug = `${slug}-${counter}`;
    while (usedSlugs.includes(newSlug)) {
      counter++;
      newSlug = `${slug}-${counter}`;
    }
    usedSlugs.push(newSlug);
    return newSlug;
  } else {
    usedSlugs.push(slug);
    return slug;
  }
}
