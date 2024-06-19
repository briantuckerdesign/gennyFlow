import * as types from "./types";
import { determineOptions, getItemOptions } from "./get-options";
import { getCaptureElements } from "./get-capture-element";
import { captureImage, captureImages } from "./capture-images";
import { downloadImages } from "./download-images";
import { runCorsProxy } from "./cors-proxy";
import { ignoreFilter } from "./utils/ignore-items";
import { defaultOptions } from "./default-options";

// WHERE I LEFT OFF:
/**
 * made tons of changes to Options and particuarly around input attributes
 * need to test
 */

// TODO: ignored nodes not working

export class ImageExporter {
  options: types.Options;

  constructor({ options: userOptions = {} }) {
    this.options = { ...defaultOptions, ...userOptions };
  }

  /**
   * Captures images from all elements specified in the options.
   * If downloadImages is set to true, the images will be downloaded.
   *
   * @returns {types.Image[]} An array of captured images.
   */
  async captureAll(): Promise<types.Image[]> {
    this.options = determineOptions(this.options);

    const captureElements = getCaptureElements(this.options);

    const images = await captureImages(this.options, captureElements);

    if (this.options.downloadImages) downloadImages(images, this.options);

    return images;
  }

  /**
   * Captures an image from a single element.
   * If downloadImages is set to true, the image will be downloaded.
   *
   * @param {Element} element - The element to capture the image from.
   * @returns {Promise<types.Image>} A promise that resolves to the captured image.
   */
  async captureElement(element): Promise<types.Image> {
    this.options = determineOptions(this.options);

    await runCorsProxy(this.options);

    const ignoredNodes = ignoreFilter(this.options);

    const image = await captureImage(
      element,
      getItemOptions(element, this.options, 1),
      ignoredNodes
    );

    if (this.options.downloadImages) downloadImages([image], this.options);

    return image;
  }

  // addTrigger(triggerElement: Element) {}
}
