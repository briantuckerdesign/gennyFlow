import * as types from "../types";

/**
 * Asynchronously retrieves specific attributes from a DOM element and updates the provided options object.
 *
 * This function checks the wrapper selector element for a predefined set of attributes. If these attributes
 * are found, their values are used to update the corresponding properties in the options object.
 *
 * @param {Object} options - The options object to be updated. Must contain a 'wrapperSelector' property.
 * @returns {Promise<Object>} A promise that resolves to the updated options object.
 *
 * - The function is asynchronous and returns a Promise.
 * - Only attributes present in the 'attributesToCheck' object and found in the element will update the options object.
 */
export function getWrapperOptions(options: types.Options): types.Options {
  const wrapper = document.querySelector(options.attributes.wrapperSelector);

  if (!wrapper) {
    console.error("ImageExporter: Wrapper element not found");
    return options;
  }

  Object.keys(options.attributes).forEach((key) => {
    const attrValue = wrapper.getAttribute(options.attributes[key]);
    if (attrValue !== null) {
      options[key] = attrValue;
    }
  });

  return options;
}
