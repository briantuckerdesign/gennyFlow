import { updateLoadingMessage } from "../utils";
import { getWrapperOptions } from "./get-wrapper-options";
import { getUserOptions } from "./get-user-options";
import { getItemOptions } from "./get-item-options";

export const attributesToCheck = {
  format: "gf-format",
  quality: "gf-quality",
  scale: "gf-scale",
  inlineSVGs: "gf-inline-svgs",
  zipName: "gf-zip-name",
  includeDateZip: "gf-include-date-zip",
  includeScaleZip: "gf-include-scale-zip",
  includeDateImg: "gf-include-date-img",
  includeScaleImg: "gf-include-scale-img",
  captureSelector: "gf-capture-selector",
  triggerSelector: "gf-trigger-selector",
  corsProxyBaseURL: "gf-cors-proxy-base-url",
};

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
async function determineOptions(options) {
  await updateLoadingMessage("Settings magic happening...", options.loaderEnabled);

  // If settings exist on the wrapper, overwrite the default options
  options = await getWrapperOptions(options, attributesToCheck);

  // If settings exist via user input, overwrite the default/wrapper options
  options = await getUserOptions(options, attributesToCheck);

  return options;
}

export { getItemOptions, determineOptions };
