import html2canvas from "html2canvas";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { closeLoader, convertToSlug, isVisible } from "./utils";
import { updateLoader } from "./utils";

/**
 * Captures and downloads images from the specified DOM elements, compressing them into a zip file if multiple images are present.
 * It also logs the process and updates the loader status as the capture progresses. Images are named and formatted
 * according to the settings provided or defaults if specific settings are not set on the elements.
 *
 * @param {Array} elementsToCapture - An array of DOM elements to be captured as images.
 * @param {Object} defaultSettings - An object containing default settings for the capture process.
 * @param {Object} userSettings - An object containing user-defined settings that override the defaults.
 * @param {boolean} loaderStatus - The current status of the loader, indicating whether it is visible or not.
 */
export async function captureAndDownloadImages(elementsToCapture, defaultSettings, userSettings, loaderStatus) {
    try {
        let date = String(new Date().getMonth() + 1).padStart(2, "0") + String(new Date().getDate()).padStart(2, "0") + new Date().getFullYear().toString().slice(-2);

        const jsZipInstance = new JSZip();

        const storedFlowLabels = [];
        let zipScale = userSettings.includeScaleZip ? `_@${userSettings.fileScale}x` : "";
        let zipDate = userSettings.includeDateZip ? `_${date}` : "";
        let zipName = convertToSlug(userSettings.zipName);
        let zipLabel = `${zipName}${zipScale}${zipDate}.zip`;

        console.groupCollapsed("Images captured:");
        for (let i = 0; i < elementsToCapture.length; i++) {
            let item = elementsToCapture[i];
            let uniqueID = i + 1;
            let itemSettings = {};

            // Skips the item if it is not visible, based on being > 1px x 1px in the dom
            if (item && !isVisible(item)) continue;

            // Gets the settings from the gf="capture" element and adds them to the itemSettings object
            Object.keys(defaultSettings).forEach((settingKey) => {
                const setting = defaultSettings[settingKey];
                const itemAttributeValue = item.getAttribute(`gf-${setting.attribute}`);
                if (itemAttributeValue) {
                    itemSettings[setting.variableName] = itemAttributeValue;
                }
            });

            let finalFormat = itemSettings.fileFormat || userSettings.fileFormat;
            let finalQuality = itemSettings.fileQuality || userSettings.fileQuality;
            let finalScale = itemSettings.fileScale || userSettings.fileScale;
            let includeScaleImg = itemSettings.includeScaleImg || userSettings.includeScaleImg;
            let includeDateImg = itemSettings.includeDateImg || userSettings.includeDateImg;
            let fileMime = finalFormat === "jpg" ? "image/jpeg" : `image/${finalFormat}`;
            const element = item.querySelector('[gf="slug"]');
            const slugFromHTMLunformatted = element ? element.textContent : "image";
            let slugFromHTML = convertToSlug(slugFromHTMLunformatted);
            let imgName = slugFromHTML ? slugFromHTML : `img-${uniqueID}`;

            console.log(
                `Img Info:
            Slug: ${slugFromHTML}
            Format: ${finalFormat}
            Quality (0-1): ${finalQuality}
            Scale: ${finalScale}x
            Include Scale in Label: ${includeScaleImg}
            Include Date in Label: ${includeDateImg}
            Mime: ${fileMime}
            `
            );
            updateLoader(`Capturing ${imgName}...`, loaderStatus);
            let imgScale = "";
            if (includeScaleImg === "true") {
                imgScale = `_@${finalScale}x`;
            }

            let imgDate = "";
            if (includeDateImg === "true") {
                imgDate = `_${date}`;
            }

            // Finalizes the label.
            let fileLabel = `${imgName}${imgDate}${imgScale}.${finalFormat}`;
            // Checks if the label has already been used
            // If it has, it will add a number to the end of the label
            if (storedFlowLabels.includes(fileLabel)) {
                fileLabel = `${imgName}-${uniqueID}${imgDate}${imgScale}.${finalFormat}`;
            }

            // Adds the label to the array of used labels
            storedFlowLabels.push(fileLabel);

            const canvas = await html2canvas(item, {
                scale: finalScale,
                allowTaint: true,
                useCORS: true,
                backgroundColor: null,
            });
            if (elementsToCapture.length === 1) {
                canvas.toBlob(
                    function (blob) {
                        window.saveAs(blob, fileLabel);
                        closeLoader();
                    },
                    fileMime,
                    finalQuality
                );
                return;
            }
            const flowDataURL = canvas.toDataURL(fileMime, finalQuality);
            const flowImg = document.createElement("img");
            flowImg.src = flowDataURL;
            jsZipInstance.file(fileLabel, flowImg.src.slice(flowImg.src.indexOf(",") + 1), { base64: true });
            if (uniqueID === elementsToCapture.length) {
                updateLoader(`Zipping it all up...`, loaderStatus);
                jsZipInstance
                    .generateAsync({ type: "blob" }, function updateCallback(metadata) {})
                    .then((content) => {
                        saveAs(content, zipLabel);
                        closeLoader();
                        console.groupEnd();
                        console.group("Export summary:");
                        console.log(`
${storedFlowLabels.length} files saved.
Settings used:
- Zip name: ${zipName}.zip
- File format: .${finalFormat}
- File quality: ${finalQuality}/1
- File scale: @${finalScale}x
- Include scale in image name: ${includeScaleImg}
- Include date in image name: ${includeDateImg}
- Include date in zip name: ${userSettings.includeDateZip}
- Include scale in zip name: ${userSettings.includeScaleZip}
        `);
                        console.groupEnd();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            itemSettings = {};
        }
    } catch (error) {
        console.error("Error running capture:", error);
    }
}
