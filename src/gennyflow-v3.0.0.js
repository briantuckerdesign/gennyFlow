function gennyFlow() {
  const flowList = $('[gennyflow="wrapper"]').find('[gennyflow="capture"]');
  console.log("flowList", flowList);

  //TODO: add SVG fixer
  //TODO: add settings via user input
  //TODO: ignore feature
  //TODO: add label options

  async function gennyCapture() {
    // flowID is a basic counter
    // It is used to ensure images without a slug have a unique filename
    let flowID = 1;
    console.log("flowID", flowID);

    // flowSettings contains the default values for each setting
    // These can be overridden by the user using attributes
    let flowSettings = [
      { attribute: "format", defaultValue: "png", type: "string" },
      { attribute: "quality", defaultValue: 1, type: "number" },
      { attribute: "scale", defaultValue: 1, type: "number" },
      { attribute: "zip-name", defaultValue: "images", type: "string" },
      {
        attribute: "disable-svg-fix",
        defaultValue: false,
        type: "boolean",
      },
    ];
    console.log("flowSettings", flowSettings[0]);

    // Loops through each setting and assigns the default value to a variable
    flowSettings.forEach((setting) => {
      // Its value would try to be pulled from the gennyflow-scale attribute
      // If it doesn't exist, it will use the default value
      let variableValue =
        $('[gennyflow="wrapper"]').attr(`gennyflow-${setting.attribute}`) ||
        setting.defaultValue;
      console.log("variableValue", variableValue);

      // converts to camel case
      attribute = setting.attribute.replace(/-([a-z])/g, (g) =>
        g[1].toUpperCase()
      );

      // For example, a generated vairable would be "scaleDefault"
      let variableName = `${attribute}Default`;
      console.log("variableName", variableName);

      // Ensures correct data type
      if (setting.type === "number") {
        variableValue = parseFloat(variableValue);
      } else if (setting.type === "boolean") {
        variableValue = variableValue === "true";
      } else if (setting.type === "string") {
        variableValue = String(variableValue);
      }

      // Pushes the variable to the window object (global variable)
      window[variableName] = variableValue;
      console.log("pushed");
    });

    // Removes all non-alphanumeric characters and replaces spaces with hyphens
    function convertToSlug(input) {
      if (typeof input === "string") {
        return input
          .replace(/[^a-zA-Z0-9 ]/g, "")
          .toLowerCase()
          .replace(/\s/g, "-");
      }
    }

    // Vroom vroom, starts up JSZip
    const jsZipInstance = new JSZip();

    // Stores the labels of each image
    // This is used to check that each image has a unique filename
    const storedFlowLabels = [];

    // Loops through each item in the flowList
    for (const flowItem of flowList) {
      // For each setting, if it was set on the item it will override the default
      let flowScale =
        parseFloat($(flowItem).attr("gennyflow-scale")) || scaleDefault;
      let flowQuality =
        parseFloat($(flowItem).attr("gennyflow-quality")) || qualityDefault;
      let flowExtension = $(flowItem).attr("gennyflow-format") || formatDefault;
      if (flowExtension === "jpg") {
        flowMimeType = "jpeg";
      } else {
        flowMimeType = flowExtension;
      }
      let flowMime = `image/${flowMimeType}`;

      //Runs HTML2Canvas
      const canvas = await html2canvas(flowItem, {
        scale: flowScale,
        backgroundColor: null, // transparent background
      });

      // Gets the slug from the item
      const slugFromHTML = convertToSlug(
        $(flowItem).find('[gennyflow="slug"]').html()
      );

      // If slugFromHTML is not set, it will use default.
      let flowLabel;
      flowLabel = slugFromHTML ? slugFromHTML : `img-${flowID}`;

      // Adds the extension to the label
      let flowLabelFinal = `${flowLabel}.${flowExtension}`;

      // Checks if the label has already been used
      if (storedFlowLabels.includes(flowLabel)) {
        flowLabelFinal = `${flowLabel}-${flowID}.${flowExtension}`;
      }
      // Adds the label to the array of used labels
      storedFlowLabels.push(flowLabel);

      // If there is only one image, it will download it
      if (flowList.length === 1) {
        canvas.toBlob(
          (blob) => {
            window.saveAs(blob, flowLabelFinal);
          },
          flowMime,
          parseFloat(flowQuality)
        );
      }
      // If there are multiple images, it will add them to the zip file
      else {
        const flowDataURL = canvas.toDataURL(flowMime, parseFloat(flowQuality));
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
              saveAs(content, `${zipNameDefault}.zip`);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }

      flowID++; // increment counter each loop
    }
  }
  // Slight delay to ensure all images have loaded. This can be adjusted.
  setTimeout(async function () {
    await gennyCapture();
  }, 750);
}
