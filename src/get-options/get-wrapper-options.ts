import * as types from "../types";
import { optionSafetyCheck } from "./safety-check";

export function getWrapperOptions(options: types.Options): types.Options {
  try {
    const wrapper = document.querySelector(options.selectors.wrapper);

    if (!wrapper) {
      new Error("Wrapper element not found");
      return options;
    }

    // For each image setting, see if value is provided in the wrapper element
    // If so, update that setting with the new value
    Object.keys(options.image).forEach((key) => {
      const attrValue = wrapper.getAttribute(options.image[key].attributeSelector);
      if (attrValue !== null) {
        const safeValue = optionSafetyCheck(key, attrValue);
        if (safeValue === null) return;
        options.image[key].value = safeValue;
        console.log("Wrapper option:", key, "=", safeValue);
      }
    });

    return options;
  } catch (e) {
    console.error("ImageExporter: Error in getWrapperOptions", e);
    return options;
  }
}
