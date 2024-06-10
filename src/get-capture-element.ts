import { Options } from "./options-interface";
import { isVisible } from "./utils/is-visible";

// Finds all elements to be captured and returns them in an array
export function getCaptureElements(options: Options): Element[] {
  if (!document.querySelector(options.attributes.wrapperSelector)) {
    console.error("ImageExporter: No capture items found in the wrapper.");
    return [];
  }

  // If CSV values found in gf-scale, encapsulate elements until all scales are accounted for
  findMultiScaleElements(options);

  // Find all elements to be captured (which includes the multi-scale elements)
  const elements = Array.from(
    document.querySelectorAll(
      `${options.attributes.wrapperSelector} ${options.attributes.captureSelector}`
    )
  );

  // Filter out elements that are not visible
  const visibleElements = elements.filter((element) => isVisible(element));

  return visibleElements;
}

// If CSV values found in ${prefix}-scale, encapsulate elements until all scales are accounted for
function findMultiScaleElements(options: Options) {
  const elements = Array.from(
    document.querySelectorAll(
      `${options.attributes.wrapperSelector} ${options.attributes.captureSelector}`
    )
  );

  const elementsWithScaleAttribute = elements.filter((element) =>
    element.hasAttribute(options.attributes.scale)
  );

  // Check attribute value. It will be a string.
  // If string successfully converts to a number, do nothing.
  // If string is comma-separated, convert to array of numbers.
  elementsWithScaleAttribute.forEach((element) => {
    const scaleValue: any = element.getAttribute(options.attributes.scale);

    if (scaleValue.includes(",")) {
      // If scaleValue is an array...
      const scaleArray: Array<Number> = scaleValue.split(",").map(Number);

      encapsulateMultiScaleElements(options, element, scaleArray);
    }
  });
}

function encapsulateMultiScaleElements(
  options: Options,
  element: Element,
  scaleArray: Array<Number>
) {
  // Set scale attribute
  element.setAttribute(options.attributes.scale, scaleArray[0].toString());
  // Force include scale img attribute
  element.setAttribute(options.attributes.imgLabelScale, "true");

  // iterate through array and wrap the element in a new element for each scale
  for (let i = 1; i < scaleArray.length; i++) {
    const newElement = cloneElementWithPrefix(options, element);
    // Set scale attribute
    newElement.setAttribute(options.attributes.scale, scaleArray[i].toString());
    // Force include scale img attribute
    newElement.setAttribute(options.attributes.imgLabelScale, "true");
    // Insert element before the original element, then move the original element inside the new element, deleting the original element
    if (element.parentNode) {
      element.parentNode.insertBefore(newElement, element);
      newElement.appendChild(element);
    }
  }
}

/**
 * Clones an element, preserving only attributes that start with 'gf'.
 *
 * This function creates a new div element and copies over all attributes from the original element
 * that start with 'gf'. This is useful for duplicating elements while retaining only a specific subset
 * of their attributes, particularly those that are relevant to a certain functionality denoted by the 'gf' prefix.
 */
function cloneElementWithPrefix(options: Options, originalElement: Element) {
  // Create a new div element
  const clonedElement = document.createElement("div");

  // Iterate over all attributes of the original element
  Array.from(originalElement.attributes).forEach((attr: any) => {
    // Check if the attribute name starts with 'gf'
    if (attr.name.startsWith(options.attributes.prefix)) {
      // Copy the attribute to the cloned element
      clonedElement.setAttribute(attr.name, attr.value);
    }
  });

  return clonedElement;
}
