import * as types from "../types";
import { optionSafetyCheck } from "./safety-check";

export function getInputOptions(options: types.Options): types.Options {
  try {
    Promise.all(
      Object.keys(options.image).map(async (key) => {
        const selector = options.image[key].inputSelector;

        const inputElement = document.querySelector(
          `[${selector}]`
        ) as HTMLInputElement | null;

        if (inputElement && inputElement.value) {
          const safeValue = optionSafetyCheck(key, inputElement.value);
          if (safeValue === null) return;

          options.image[key].value = safeValue;
          console.log("User input option:", key, "=", safeValue);
        }
      })
    );

    return options;
  } catch (e) {
    console.error("ImageExporter: Error in getUserOptions", e);
    return options;
  }
}
