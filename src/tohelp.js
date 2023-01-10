for (let i = 0; i < flowList.length; i++) {
    let item = flowList[i];
    let flowID = i + 1;
    let itemSettings = {};
    Object.keys(flowSettings).forEach((settingKey) => {
        const setting = flowSettings[settingKey];
        let itemAttributeValue = $(item).attr(`gf-${setting.attribute}`);
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
    const slugFromHTMLunformatted = $(item).find('[gf="slug"]').html();
    let slugFromHTML = convertToSlug(slugFromHTMLunformatted);
    let imgName = slugFromHTML ? slugFromHTML : `img-${flowID}`;

    let imgScale = "";
    if (includeScaleImg === "true") {
        imgScale = `_@${finalScale}x`;
    }

    let imgDate = "";
    if (includeDateImg === "true") {
        imgDate = `_${date}x`;
    }

    // Finalizes the label.
    let fileLabel = `${imgName}${imgDate}${imgScale}.${finalFormat}`;
    // Checks if the label has already been used
    // If it has, it will add a number to the end of the label
    if (storedFlowLabels.includes(imgName)) {
        fileLabel = `${imgName}-${flowID}${imgDate}${imgScale}.${finalFormat}`;
    }

    // Adds the label to the array of used labels
    storedFlowLabels.push(imgName);

    // single works, multi doesn't
    html2canvas(item, {
        scale: finalScale,
        allowTaint: true,
        useCORS: true,
        backgroundColor: null,
    })
        .then((canvas) => {
            if (flowList.length === 1) {
                canvas.toBlob(
                    function (blob) {
                        window.saveAs(blob, fileLabel);
                    },
                    finalFormat,
                    parseFloat(finalQuality)
                );
            } else {
                const flowDataURL = canvas.toDataURL(fileMime, parseFloat(finalQuality));
                const flowImg = document.createElement("img");
                flowImg.src = flowDataURL;

                jsZipInstance.file(fileLabel, flowImg.src.slice(flowImg.src.indexOf(",") + 1), {
                    base64: true,
                });

                if (i + 1 === flowList.length) {
                    jsZipInstance
                        .generateAsync(
                            {
                                type: "blob",
                            },
                            function updateCallback(metadata) {}
                        )
                        .then((content) => {
                            saveAs(content, zipLabel);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }
        })
        .catch((err) => {
            console.log(err);
        });
    itemSettings = {};
}
