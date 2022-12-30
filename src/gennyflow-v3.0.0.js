function gennyFlow() {
  // flowList is a list of all elements with the gennyflow="capture" attribute
  // But only if they are inside an element with the gennyflow="wrapper" attribute
  const flowList = $('[gennyflow="wrapper"]').find('[gennyflow="capture"]');

  //TODO: add settings via user input
  //TODO: THOROUGH review bc this is a mess

  async function gennyCapture() {
    // flowID is a basic counter
    // It is used to ensure images without a slug have a unique filename
    let flowID = 1;

    // flowSettings contains the default values for each setting
    // These can be overridden by the user using attributes
    let flowSettings = [
      {
        attribute: "format",
        variableName: "fileFormat",
        value: "png",
        type: "string",
      },
      {
        attribute: "quality",
        variableName: "fileQuality",
        value: 1,
        type: "number",
      },
      {
        attribute: "scale",
        variableName: "fileScale",
        value: 1,
        type: "number",
      },
      {
        attribute: "zip-name",
        variableName: "zipName",
        value: "images",
        type: "string",
      },
      {
        attribute: "disable-svg-fix",
        variableName: "disableSVGfix",
        value: false,
        type: "boolean",
      },
      {
        attribute: "include-date-zip",
        variableName: "includeDateZip",
        value: false,
        type: "boolean",
      },
      {
        attribute: "include-scale-zip",
        variableName: "includeScaleZip",
        value: false,
        type: "boolean",
      },
      {
        attribute: "include-date-img",
        variableName: "includeDateImg",
        value: false,
        type: "boolean",
      },
      {
        attribute: "include-scale-img",
        variableName: "includeScaleImg",
        value: false,
        type: "boolean",
      },
    ];

    // Loops through each setting and assigns the default value to a variable
    flowSettings.forEach((setting) => {
      // Its value would try to be pulled from the gennyflow-scale attribute
      // If it doesn't exist, it will use the default value
      let variableValue =
        $('[gennyflow="wrapper"]').attr(`gennyflow-${setting.attribute}`) ||
        setting.value;
      let variableName = setting.variableName;

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
      console.log("variable created: " + variableName);
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

    // Fixes two SVG issues
    if (disableSVGfix === false) {
      const imgs = document.querySelectorAll(
        'div[gennyflow=wrapper] img[src$=".svg"]:not([gennyflow=ignore])'
      );
      imgs.forEach((img) => {
        img.classList.add("gf_img2svg");
      });
      // Fix 1: Turns .svg's loaded as <img> into inline <svg>'s
      inlineSVG.init({
        svgSelector: "img.gf_img2svg", // the class attached to all images that should be inlined
        initClass: "js-inlinesvg", // class added to the inlined SVG
      });
      // Fix 2: Set explicit height/width for inline <svg>'s (HTML2Canvas issue)
      var svgElements = document.body.querySelectorAll("svg.gf_img2svg");
      svgElements.forEach(function (item) {
        item.setAttribute("width", item.getBoundingClientRect().width);
        item.setAttribute("height", item.getBoundingClientRect().height);
      });
    }

    // Ignores all elements with the gennyflow="ignore" attribute
    const ignoreElements = document.querySelectorAll('[gennyflow="ignore"]');

    ignoreElements.forEach((element) => {
      element.setAttribute("data-html2canvas-ignore", "true");
    });

    // Gets current date in MMDDYY format
    function formatDate() {
      const date = new Date();
      return (
        String(date.getMonth() + 1).padStart(2, "0") +
        String(date.getDate()).padStart(2, "0") +
        date.getFullYear().toString().substr(-2)
      );
    }
    let date = formatDate();

    // Vroom vroom, starts up JSZip
    const jsZipInstance = new JSZip();

    // Stores the labels of each image
    // This is used to check that each image has a unique filename
    const storedFlowLabels = [];

    // Loops through each item in the flowList
    for (const flowItem of flowList) {
      // For each setting, if it was set on the item it will override the default
      let flowScale =
        parseFloat($(flowItem).attr("gennyflow-scale")) || fileScale;
      console.log("flowScale " + flowScale + ", ID" + flowID);

      let flowQuality =
        parseFloat($(flowItem).attr("gennyflow-quality")) || fileQuality;
      let flowExtension = $(flowItem).attr("gennyflow-format") || fileFormat;
      let flowMimeType;
      if (flowExtension === "jpg") {
        flowMimeType = "jpeg";
      } else {
        flowMimeType = flowExtension;
      }
      let flowMime = `image/${flowMimeType}`;
      let flowIncludeScaleImg = $(flowItem).attr("gennyflow-include-scale-img");
      if (flowIncludeScaleImg === undefined) {
        flowIncludeScaleImg = includeScaleImg;
      }
      let flowIncludeDateImg =
        $(flowItem).attr("gennyflow-include-date-img") || includeDateImg;

      // Gets the slug from the item
      const slugFromHTML = convertToSlug(
        $(flowItem).find('[gennyflow="slug"]').html()
      );
      // If slugFromHTML is not set, it will use default.
      let imgName = slugFromHTML ? slugFromHTML : `img-${flowID}`;

      let imgScale = `_@${fileScale}x`;
      if (flowIncludeScaleImg === "false") {
        imgScale = "";
      }

      let imgDate = `_${date}`;
      if (flowIncludeDateImg === "false") {
        imgDate = "";
      }

      // Finalizes the label.
      let flowLabelFinal = `${imgName}${imgScale}${imgDate}.${flowExtension}`;
      // Checks if the label has already been used
      // If it has, it will add a number to the end of the label
      if (storedFlowLabels.includes(imgName)) {
        flowLabelFinal = `${imgName}-${flowID}${imgScale}${imgDate}.${flowExtension}`;
      }
      console.log("flowLabelFinal " + flowLabelFinal + ", ID" + flowID);

      // Adds the label to the array of used labels
      storedFlowLabels.push(imgName);

      //Runs HTML2Canvas
      const canvas = await html2canvas(flowItem, {
        scale: flowScale,
        backgroundColor: null, // transparent background
      });

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
              let zipScale = includeScaleZip ? `_@${fileScale}x` : "";
              let zipDate = includeDateZip ? `_${date}` : "";
              saveAs(content, `${zipName}${zipScale}${zipDate}.zip`);
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
