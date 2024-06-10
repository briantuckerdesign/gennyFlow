import { determineOptions, getItemOptions } from "./get-options";
import { getCaptureElements } from "./get-capture-element";
import { captureImage, captureImages } from "./capture-images";
import { downloadImages } from "./download-images";
import { Options } from "./options-interface";
import { runCorsProxy } from "./cors-proxy";
import { getIgnoredNodes } from "./utils/ignore-items";

// TODO: Slug broken
// TODO: Format via input broken

export class ImageExporter {
  options: Options;

  constructor({ options: userOptions = {} }) {
    const defaultOptions = {
      format: "png",
      quality: 1,
      scale: 1,
      zipLabel: "images",
      zipLabelDate: true,
      zipLabelScale: true,
      imgLabelDate: true,
      imgLabelScale: true,
      corsProxyBaseUrl: "",
      downloadImages: true,
      prefix: "ie",
      attributes: {
        wrapperSelector: `[ie="wrapper"]`,
        captureSelector: '[ie="capture"]',
        triggerSelector: '[ie="trigger"]',
        scale: "ie-scale",
        quality: "ie-quality",
        format: "ie-format",
        zipLabel: "ie-zip-label",
        zipLabelDate: "ie-zip-label-date",
        zipLabelScale: "ie-zip-label-scale",
        imgLabelDate: "ie-img-label-date",
        imgLabelScale: "ie-img-label-scale",
        corsProxyBaseUrl: "ie-cors-proxy-base-url",
      },
    };
    this.options = { ...defaultOptions, ...userOptions };
  }

  /**
   * Captures images from all elements specified in the options.
   * If downloadImages is set to true, the images will be downloaded.
   *
   * @returns {Array} An array of captured images.
   */
  async captureAll() {
    this.options = determineOptions(this.options);
    const captureElements = getCaptureElements(this.options);
    const images = await captureImages(this.options, captureElements);
    // return;
    if (this.options.downloadImages) downloadImages(images, this.options);
    return images;
  }

  async captureElement(element) {
    this.options = determineOptions(this.options);
    await runCorsProxy(this.options);
    const ignoredNodes = getIgnoredNodes(this.options);
    const image = await captureImage(
      element,
      getItemOptions(element, this.options, 1),
      ignoredNodes
    );
    if (this.options.downloadImages) downloadImages([image], this.options);
    return image;
  }

  // insertImage() {}

  // returnImage() {}

  // addTrigger(triggerElement: Element) {}
}
