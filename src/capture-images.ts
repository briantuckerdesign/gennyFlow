import * as htmlToImage from "html-to-image";
import {
  determineIndividualItemSettings as determineItemSettings,
  updateLoadingMessage,
} from "./utils";
import { nodesToIgnore, prepareIgnoredNodes } from "./utils/ignore-items";

export async function captureImages(
  elementsToCapture,
  settings,
  loaderEnabled
) {
  updateLoadingMessage(`Capturing images...`, loaderEnabled);

  await prepareIgnoredNodes;

  const images = await Promise.all(
    elementsToCapture.map((element, index) =>
      captureImage(
        element,
        determineItemSettings(element, settings, index + 1),
        loaderEnabled
      )
    )
  );

  updateLoadingMessage(`All images captured...`, loaderEnabled);

  return images;
}

async function captureImage(element, itemSettings, loaderEnabled) {
  updateLoadingMessage(`Capturing ${itemSettings.fileName}`, loaderEnabled);

  let dataURL = "";

  // Checking the finalFormat and capturing the image accordingly
  switch (itemSettings.fileFormat.toLowerCase()) {
    case "jpg":
    case "jpeg":
      dataURL = await htmlToImage.toJpeg(element, {
        quality: itemSettings.finalQuality,
        pixelRatio: itemSettings.finalScale,
        filter: nodesToIgnore,
      });
      itemSettings.slug = `${itemSettings.fileName}.jpg`;
      break;
    case "png":
    default:
      dataURL = await htmlToImage.toPng(element, {
        quality: itemSettings.finalQuality,
        pixelRatio: itemSettings.finalScale,
        filter: nodesToIgnore,
      });
      itemSettings.slug = `${itemSettings.fileName}.png`;
      break;
  }

  const image: [string, string] = [dataURL, itemSettings.slug];

  return image;
}
