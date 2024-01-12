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
export async function getWrapperOptions(options, attributesToCheck) {
  const wrapper = document.querySelector(options.wrapperSelector);

  if (!wrapper) {
    console.error("gennyFlow: Wrapper element not found");
    return options;
  }

  Object.keys(attributesToCheck).forEach((key) => {
    const attrValue = wrapper.getAttribute(attributesToCheck[key]);
    if (attrValue !== null) {
      options[key] = attrValue;
    }
  });

  return options;
}
