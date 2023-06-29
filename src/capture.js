import html2canvas from "html2canvas";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { closeLoader, convertToSlug, isVisible } from "./utils";
import { updateLoader } from "./utils";

export async function capture(flowList, flowSettings, settings, loaderStatus) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    let date = String(new Date().getMonth() + 1).padStart(2, "0") + String(new Date().getDate()).padStart(2, "0") + new Date().getFullYear().toString().slice(-2);

    const jsZipInstance = new JSZip();

    const storedFlowLabels = [];
    let zipScale = settings.includeScaleZip ? `_@${settings.fileScale}x` : "";
    let zipDate = settings.includeDateZip ? `_${date}` : "";
    let zipName = convertToSlug(settings.zipName);
    let zipLabel = `${zipName}${zipScale}${zipDate}.zip`;

    for (let i = 0; i < flowList.length; i++) {
        let item = flowList[i];
        let flowID = i + 1;
        let itemSettings = {};

        // Skips the item if it is not visible, based on being > 1px x 1px in the dom
        if (item && !isVisible(item)) continue;

        // Gets the settings from the gf="capture" element and adds them to the itemSettings object
        Object.keys(flowSettings).forEach((settingKey) => {
            const setting = flowSettings[settingKey];
            const itemAttributeValue = item.getAttribute(`gf-${setting.attribute}`);
            if (itemAttributeValue) {
                itemSettings[setting.variableName] = itemAttributeValue;
            }
        });

        let finalFormat = itemSettings.fileFormat || settings.fileFormat;
        let finalQuality = itemSettings.fileQuality || settings.fileQuality;
        let finalScale = itemSettings.fileScale || settings.fileScale;
        let includeScaleImg = itemSettings.includeScaleImg || settings.includeScaleImg;
        let includeDateImg = itemSettings.includeDateImg || settings.includeDateImg;
        let fileMime = finalFormat === "jpg" ? "image/jpeg" : `image/${finalFormat}`;
        const slugFromHTMLunformatted = item.querySelector('[gf="slug"]').innerHTML;
        let slugFromHTML = convertToSlug(slugFromHTMLunformatted);
        let imgName = slugFromHTML ? slugFromHTML : `img-${flowID}`;
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
            fileLabel = `${imgName}-${flowID}${imgDate}${imgScale}.${finalFormat}`;
        }

        // Adds the label to the array of used labels
        storedFlowLabels.push(fileLabel);

        const canvas = await html2canvas(item, {
            scale: finalScale,
            allowTaint: true,
            useCORS: true,
            backgroundColor: null,
        });
        if (flowList.length === 1) {
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
        if (flowID === flowList.length) {
            updateLoader(`Zipping it all up...`, loaderStatus);
            jsZipInstance
                .generateAsync({ type: "blob" }, function updateCallback(metadata) {})
                .then((content) => {
                    saveAs(content, zipLabel);
                    closeLoader();

                    console.log(`
${storedFlowLabels.length} files saved.
Settings used:
- Zip name: ${zipName}.zip
- File format: .${finalFormat}
- File quality: ${finalQuality}/1
- File scale: @${finalScale}x
- Include scale in image name: ${includeScaleImg}
- Include date in image name: ${includeDateImg}
- Include date in zip name: ${settings.includeDateZip}
- Include scale in zip name: ${settings.includeScaleZip}
        `);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        itemSettings = {};
    }
}