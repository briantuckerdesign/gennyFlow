function gennyFlow() {
  const flowList = $('[gf="wrapper"]').find('[gf="capture"]');
  console.log(`
  gennyFlow v3.0.2
  Running on ${flowList.length} items.  
  `);
  const flowSettings = {
    format: {
      attribute: "format",
      variableName: "fileFormat",
      default: "png",
      type: "string",
    },
    quality: {
      attribute: "quality",
      variableName: "fileQuality",
      default: 1,
      type: "number",
    },
    scale: {
      attribute: "scale",
      variableName: "fileScale",
      default: 1,
      type: "number",
    },
    zipName: {
      attribute: "zip-name",
      variableName: "zipName",
      default: "images",
      type: "string",
    },
    disableSVGfix: {
      attribute: "disable-svg-fix",
      variableName: "disableSVGfix",
      default: false,
      type: "boolean",
    },
    includeDateZip: {
      attribute: "include-date-zip",
      variableName: "includeDateZip",
      default: true,
      type: "boolean",
    },

    includeScaleZip: {
      attribute: "include-scale-zip",
      variableName: "includeScaleZip",
      default: true,
      type: "boolean",
    },
    includeDateImg: {
      attribute: "include-date-img",
      variableName: "includeDateImg",
      default: false,
      type: "boolean",
    },
    includeScaleImg: {
      attribute: "include-scale-img",
      variableName: "includeScaleImg",
      default: false,
      type: "boolean",
    },
  };

  // ORDER OF PRECEDENCE
  // 1. Value from a gf="capture" element
  // 2. User input e.g. gf="scale-input" used on an html input
  // 3. Value from the gf="wrapper" element (this logic happens later in the code)
  // 4. Default value above

  const settings = {};

  Object.keys(flowSettings).forEach((settingKey) => {
    const setting = flowSettings[settingKey];
    let variableName = setting.variableName;
    const userValue = $(`[gf="${setting.attribute}-input"]`).val();
    const wrapperValue = $(`[gf="wrapper"]`).attr(`gf-${setting.attribute}`);
    let variableValue = userValue || wrapperValue || setting.default;
    settings[variableName] = variableValue;
  });

  function convertToSlug(input) {
    input = input.toLowerCase();
    input = input.replace(/[^a-z0-9_ -]/g, "");
    input = input.replace(/\s+/g, "-");
    return input;
  }

  if (settings.disableSVGfix === false) {
    const imgs = document.querySelectorAll(
      'div[gf=wrapper] img[src$=".svg"]:not([gf=ignore])'
    );
    imgs.forEach((img) => {
      img.classList.add("gf_img2svg");
      console.log("gf_img2svg added");
    });
    inlineSVG.init({
      svgSelector: "img.gf_img2svg",
      initClass: "js-inlinesvg",
    });

    var svgElements = document.body.querySelectorAll("svg.gf_img2svg");
    svgElements.forEach(function (item) {
      item.setAttribute("width", item.getBoundingClientRect().width);
      item.setAttribute("height", item.getBoundingClientRect().height);
    });
  }

  const ignoreElements = document.querySelectorAll('[gf="ignore"]');
  ignoreElements.forEach((element) => {
    element.setAttribute("data-html2canvas-ignore", "true");
  });

  let date =
    String(new Date().getMonth() + 1).padStart(2, "0") +
    String(new Date().getDate()).padStart(2, "0") +
    new Date().getFullYear().toString().slice(-2);

  const jsZipInstance = new JSZip();
  const storedFlowLabels = [];

  let zipScale = settings.includeScaleZip ? `_@${settings.fileScale}x` : "";
  let zipDate = settings.includeDateZip ? `_${date}` : "";
  let zipName = convertToSlug(settings.zipName);
  let zipLabel = `${zipName}${zipScale}${zipDate}.zip`;

  setTimeout(async function () {
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
      let includeScaleImg =
        itemSettings.includeScaleImg || settings.includeScaleImg;
      let includeDateImg =
        itemSettings.includeDateImg || settings.includeDateImg;
      let fileMime =
        finalFormat === "jpg" ? "image/jpeg" : `image/${finalFormat}`;
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
      if (storedFlowLabels.includes(fileLabel)) {
        fileLabel = `${imgName}-${flowID}${imgDate}${imgScale}.${finalFormat}`;
      }

      // Adds the label to the array of used labels
      storedFlowLabels.push(fileLabel);

      // single works, multi doesn't
      html2canvas(item, {
        scale: finalScale,
        allowTaint: true,
        useCORS: true,
        backgroundColor: null,
      })
        .then(async (canvas) => {
          if (flowList.length === 1) {
            canvas.toBlob(
              function (blob) {
                window.saveAs(blob, fileLabel);
              },
              finalFormat,
              parseFloat(finalQuality)
            );
            console.log(`
            1 image saved
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
            return;
          }
          const flowDataURL = canvas.toDataURL(
            fileMime,
            parseFloat(finalQuality)
          );
          const flowImg = document.createElement("img");
          flowImg.src = flowDataURL;

          jsZipInstance.file(
            fileLabel,
            flowImg.src.slice(flowImg.src.indexOf(",") + 1),
            { base64: true }
          );

          if (storedFlowLabels.length === flowList.length) {
            jsZipInstance
              .generateAsync(
                { type: "blob" },
                function updateCallback(metadata) {}
              )
              .then((content) => {
                saveAs(content, zipLabel);
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
        })
        .catch((err) => {
          console.log(err);
        });
      itemSettings = {};
    }
  }, 500);
}
// }

$("[gf=trigger]").click(() => gennyFlow());
