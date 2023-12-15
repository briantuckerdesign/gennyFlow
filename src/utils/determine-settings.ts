import { getUserValue, getWrapperValue } from "./get-user-values";
import { convertToSlug } from "./convert-to-slug";
import { updateLoadingMessage } from "./loader";

export async function determineSettings(
  defaultSettings,
  wrapperSelector,
  loaderEnabled
) {
  updateLoadingMessage("Settings magic happening...", loaderEnabled);
  let settings = {};
  Object.keys(defaultSettings).forEach((settingKey) => {
    const setting = defaultSettings[settingKey];

    // Retrieve values from different sources
    const userValue = getUserValue(setting.attribute);
    const wrapperValue = getWrapperValue(setting.attribute, wrapperSelector);

    // Determine the final value to use
    // Uses user value first, otherwise wrapper value, otherwise default.
    const finalValue = userValue || wrapperValue || setting.default;

    // Assign the final value to the corresponding setting
    settings[setting.variableName] = finalValue;
  });
  return settings;
}

export async function determineWrapperSettings(
  settings: object,
  wrapperSelector: string
) {
  return settings;
}

//
export function determineIndividualItemSettings(
  imageElement,
  settings,
  itemID
) {
  const itemSettings = { ...settings };

  console.log("file: determine-settings.ts:38 ~ itemSettings:", itemSettings);

  // Loop through the settings object and check if item attributes exist to override them
  for (const settingKey in settings) {
    const setting = settings[settingKey];
    const attribute = `gf-${setting.attribute}`;
    const itemAttributeValue = imageElement.getAttribute(attribute);

    if (itemAttributeValue !== null) {
      itemSettings[setting.variableName] = itemAttributeValue;
    }
  }

  // Determine final settings
  const slug =
    convertToSlug(
      imageElement.querySelector('[gf="slug"]')?.textContent || "image"
    ) || `img-${itemID}`;
  console.log("file: determine-settings.ts:54 ~ slug:", slug);
  itemSettings.fileName = slug;

  return itemSettings;
}
