function gennyFlow(instance) {
    const flowList = $(`[gennyflow="wrapper-${instance}"]`).find(
        '[gennyflow="capture"]'
    );
    //TODO: add SVG fixer
    //TODO: add settings via user input
    //TODO: ignore feature

    async function gennyCapture() {
        let flowID = 1;
        let flowSettings = [
            { attribute: "format", default: "png", type: "string" },
            { attribute: "quality", default: 1, type: "number" },
            { attribute: "scale", default: 1, type: "number" },
        ];

        flowSettings.forEach((setting) => {
            const { attribute, default: defaultValue } = setting;
            const variableName = `${attribute}Default`;
            const variableValue =
                $('[gennyflow="wrapper"]').attr(`gennyflow-${attribute}`) ||
                defaultValue;
            window[variableName] = variableValue;
        });
        console.log(formatDefault, qualityDefault, scaleDefault);

        // let formatDefault =
        //     $('[gennyflow="wrapper"]').attr("gennyflow-format") || "png"; // Default: png
        // let qualityDefault =
        //     $('[gennyflow="wrapper"]').attr("gennyflow-quality") || 1; // Default: 1 (max)
        // let scaleDefault =
        //     parseFloat($('[gennyflow="wrapper"]').attr("gennyflow-scale")) || 1; // Default: 1x

        function convertToSlug(input) {
            if (typeof input === "string") {
                return input
                    .replace(/[^a-zA-Z0-9 ]/g, "")
                    .toLowerCase()
                    .replace(/\s/g, "-");
            }
        }

        const jsZipInstance = new JSZip();
        const storedFlowLabels = [];
        //Loops through each item with gennyflow="capture" attribute
        for (const flowItem of flowList) {
            let flowScale =
                parseFloat($(flowItem).attr("gennyflow-scale")) || scaleDefault;
            let flowQuality =
                $(flowItem).attr("gennyflow-quality") || qualityDefault;
            let flowExtension =
                $(flowItem).attr("gennyflow-format") || formatDefault;
            if (flowExtension === "jpg") {
                flowMimeType = "jpeg";
            } else {
                flowMimeType = flowExtension;
            }
            let flowMime = `image/${flowMimeType}`;

            //Runs HTML2Canvas
            const canvas = await html2canvas(flowItem, {
                scale: flowScale,
                allowTaint: true,
                useCORS: true,
                backgroundColor: null, // transparent background
            });

            const slug = convertToSlug(
                $(flowItem).find('[gennyflow="slug"]').html()
            );
            // let flowLabel;
            // if (slug) {
            //     flowLabel = `${slug}.${flowExtension}`;
            // } else {
            //     flowLabel = `img-${flowID}.${flowExtension}`;
            // }

            let flowLabel;
            if (slug) {
                flowLabel = slug;
            } else {
                flowLabel = `img-${flowID}`;
            }
            let flowLabelFinal = `${flowLabel}.${flowExtension}`;

            if (storedFlowLabels.includes(flowLabel)) {
                //TODO: this area is broken. try again when less tired
                flowLabelFinal = `${flowLabelFinal}-${flowID}.${flowExtension}`;
            }
            storedFlowLabels.push(flowLabel);

            if (flowList.length === 1) {
                canvas.toBlob(
                    (blob) => {
                        window.saveAs(blob, flowLabelFinal);
                    },
                    flowMime,
                    parseFloat(flowQuality)
                );
            } else {
                const flowDataURL = canvas.toDataURL(
                    flowMime,
                    parseFloat(flowQuality)
                );
                const flowImg = document.createElement("img");
                flowImg.src = flowDataURL;

                jsZipInstance.file(
                    flowLabelFinal,
                    flowImg.src.slice(flowImg.src.indexOf(",") + 1),
                    {
                        base64: true,
                    }
                );

                // If all images have been captured, generate the zip file
                if (flowID === flowList.length) {
                    jsZipInstance
                        .generateAsync(
                            {
                                type: "blob",
                            },
                            function updateCallback(metadata) {}
                        )
                        .then((content) => {
                            saveAs(content, `images.zip`);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }

            flowID++; // increment counter on each iteration
        }
    }
    setTimeout(async function () {
        await gennyCapture();
    }, 750);
}
