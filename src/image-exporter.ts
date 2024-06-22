import * as types from "./types";
import { determineOptions, getItemOptions } from "./get-options";
import { findMultiScaleElements, getCaptureElements } from "./get-capture-element";
import { captureImage, captureImages } from "./capture-images";
import { downloadImages } from "./download-images";
import { runCorsProxy } from "./cors-proxy";
import { ignoreFilter } from "./utils/ignore-items";
import { defaultOptions } from "./default-options";
import { cleanUp } from "./clean-up";

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

    cleanUp(this.options, captureElements);

    return images;
  }

  /**
   * Captures an image from a single element.
   * If downloadImages is set to true, the image will be downloaded.
   *
   * If multiscale elements are found,
   * the element will be cloned and captured at each scale.
   *
   * @param {Element} element - The element to capture the image from.
   * @returns {Promise<types.Image>} A promise that resolves to the captured image.
   */
  async captureElement(element): Promise<types.Image | types.Image[]> {
    this.options = determineOptions(this.options);

    await runCorsProxy(this.options);

    const ignoredNodes = ignoreFilter(this.options);

    const multiScale = findMultiScaleElements(this.options);

    if (multiScale) {
      const elements = Array.from(
        document.querySelectorAll("[ie-clone], [ie-clone-source]")
      );
      const images = await captureImages(this.options, elements);

      if (this.options.downloadImages) downloadImages(images, this.options);

      cleanUp(this.options, elements);

      return images;
    }

    const image = await captureImage(
      element,
      getItemOptions(element, this.options, 1),
      ignoredNodes
    );

    if (this.options.downloadImages) downloadImages([image], this.options);

    cleanUp(this.options, [element]);

    return image;
  }

  /**
   * Adds a click event listener to the trigger element.
   * If no element is provided, the captureAll method will be run on click.
   * If an element is provided, provided element will be captured on click.
   */
  addTrigger(triggerElement: Element, element: Element | null = null) {
    if (!element) {
      // add event listener to trigger element. on click, run captureAll
      triggerElement.addEventListener("click", () => {
        this.captureAll();
      });
    } else {
      // add event listener to trigger element. on click, run captureElement
      triggerElement.addEventListener("click", () => {
        this.captureElement(element);
      });
    }
  }
}
