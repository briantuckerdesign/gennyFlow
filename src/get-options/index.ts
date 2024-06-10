import { getWrapperOptions } from "./get-wrapper-options";
import { getUserOptions } from "./get-user-options";
import { getItemOptions } from "./get-item-options";
import { Options } from "../options-interface";

/**
 * Asynchronously determines and finalizes settings by aggregating them from multiple sources.
 *
 * This function works through a sequence of steps to build a comprehensive settings object. Initially,
 * it displays a loading message. It then sequentially updates the settings based on the attributes of a
 * wrapper element and user inputs, respectively. Each step potentially overwrites the settings from the
 * previous steps, allowing for a layered approach to setting configuration.
 *
 * @param {Object} options - The initial settings object, which may contain default settings.
 * @returns {Promise<Object>} A promise that resolves to the fully determined settings object.
 *
 */
function determineOptions(options): Options {
  // If settings exist on the wrapper, overwrite the default options
  options = getWrapperOptions(options);

  // If settings exist via user input, overwrite the default/wrapper options
  options = getUserOptions(options);

  return options;
}

export { getItemOptions, determineOptions };
