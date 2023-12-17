import { attributesToCheck } from ".";
import { convertToSlug, parseImageLabel } from "../utils";

/**
 * Extracts and customizes settings for a specific element based on its attributes and additional criteria.
 *
 * This function creates a copy of the provided options object and then customizes it for an individual
 * element. It checks for specific attributes on the element (defined in the 'attributesToCheck' parameter)
 * and, if present, overwrites the corresponding properties in the options object with the attribute values.
 * Additionally, it sets a 'slug' property based on the content of a specific child element or generates a
 * unique name based on the index.
 *
 * @param {HTMLElement} element - The HTML element for which the settings are being determined.
 * @param {Object} options - The base options object that provides default settings.
 * @param {number} index - An index value, typically representing the element's position in a collection.
 * @param {Object} attributesToCheck - An object mapping option keys to attribute names to be checked on the element.
 * @returns {Object} An object containing the customized settings for the element.
 *
 */
export function getItemOptions(element, options, index) {
  let itemOptions = { ...options };

  // Assuming attributesToCheck is defined globally or within scope
  Object.keys(attributesToCheck).forEach((key) => {
    const attributeName = attributesToCheck[key];
    const attributeValue = element.getAttribute(attributeName);

    if (attributeValue !== null) {
      itemOptions[key] = attributeValue;
    }
  });
  itemOptions.id = index;
  itemOptions.userSlug =
    element.querySelector('[gf="slug"]')?.textContent || null;
  itemOptions.slug = parseImageLabel(itemOptions);

  return itemOptions;
}
