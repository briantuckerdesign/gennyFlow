import { Options } from "../options-interface";
import { getUserValue } from "../utils";

/**
 * Asynchronously retrieves user input for specified attributes and updates the provided options object.
 *
 * This function iterates over a predefined set of attributes ('attributesToCheck') and fetches user input
 * for each attribute using the 'getUserValue' function. The retrieved values are then used to update
 * corresponding properties in the 'options' object.
 *
 * @param {Object} options - The options object to be updated.
 * @returns {Promise<Object>} A promise that resolves to the updated options object.
 *
 * Assumptions:
 * - 'getUserValue' is an asynchronous function that takes an attribute name and returns a Promise that resolves
 *   to the user input value for that attribute.
 * - If 'getUserValue' returns a non-falsy value, it is considered valid input and is used to update the
 *   corresponding key in the 'options' object.
 * - The function waits for all user inputs to be processed (using Promise.all) before returning the updated options.
 *
 */
export function getUserOptions(options: Options): Options {
  Promise.all(
    Object.keys(options.attributes).map(async (key) => {
      const attributeName = options.attributes[key];

      //if attribute name starts with [ then skip
      if (attributeName.startsWith("[")) return null;

      const userInputValue = await getUserValue(options, attributeName);
      if (userInputValue) {
        options[key] = userInputValue;
      }
    })
  );

  return options;
}
