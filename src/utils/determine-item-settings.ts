// import { convertToSlug } from "./convert-to-slug";

// export function determineIndividualItemSettings(
//   imageElement,
//   settings,
//   itemID
// ) {
//   let itemSettings;
//   // Gets the settings from the gf="capture" element and adds them to the itemSettings object
//   Object.keys(settings).forEach((settingKey) => {
//     // i.e. "scale"
//     const setting = settings[settingKey];
//     // Check if item has a this setting (e.g. scale) to override the main settings
//     const itemAttributeValue = imageElement.getAttribute(
//       `gf-${setting.attribute}`
//     );
//     // If it does, use it for the item's settings
//     if (itemAttributeValue) {
//       itemSettings[setting.variableName] = itemAttributeValue;
//     }
//   });

//   let finalFileFormat = itemSettings.fileFormat || settings.fileFormat;
//   let finalQuality = itemSettings.fileQuality || settings.fileQuality;
//   let finalScale = itemSettings.fileScale || settings.fileScale;
//   let includeScaleImg =
//     itemSettings.includeScaleImg || settings.includeScaleImg;
//   let includeDateImg = itemSettings.includeDateImg || settings.includeDateImg;
//   let fileMime =
//     finalFileFormat === "jpg" ? "image/jpeg" : `image/${finalFileFormat}`;
//   const itemSlug = imageElement.querySelector('[gf="slug"]');
//   const slugFromHTMLunformatted = itemSlug ? itemSlug.textContent : "image";
//   const slugFromHTML = convertToSlug(slugFromHTMLunformatted);
//   const imgName = slugFromHTML ? slugFromHTML : `img-${itemID}`;

//   return {
//     itemSettings,
//     finalFileFormat,
//     finalQuality,
//     finalScale,
//     includeScaleImg,
//     includeDateImg,
//     fileMime,
//     imgName,
//   };
// }
