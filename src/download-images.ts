import download from "downloadjs";
import JSZip from "jszip";

import { parseZipLabel, updateLoadingMessage } from "./utils";
export async function downloadImages(images, settings, loaderEnabled) {
  if (images.length === 1) {
    const [dataURL, fileName] = images[0];
    await download(dataURL, fileName);
    updateLoadingMessage("File downloaded!", loaderEnabled);
  } else if (images.length > 1) {
    const zipName = parseZipLabel(settings);
    const zipBlob = await zipUpImages(images);
    await download(zipBlob, zipName);
  }
}

async function zipUpImages(images) {
  const zip = new JSZip();
  // Loop through each image tuple and add to the zip
  images.forEach(([dataURL, filename]) => {
    // Extract the content from the data URL
    const content = dataURL.split(",")[1]; // Assumes base64 encoding
    zip.file(filename, content, { base64: true });
  });

  try {
    // Generate the ZIP file
    const zipBlob = await zip.generateAsync({ type: "blob" });
    return zipBlob;
  } catch (error) {
    console.error("Error creating ZIP:", error);
    throw error; // Or handle it as needed
  }
}
