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
export async function getUserOptions(options, attributesToCheck) {
  await Promise.all(
    Object.keys(attributesToCheck).map(async (key) => {
      const attributeName = attributesToCheck[key];
      const userInputValue = await getUserValue(attributeName);
      if (userInputValue) {
        options[key] = userInputValue;
      }
    })
  );

  return options;
}
