function gennyFlow() {
  // flowList is a list of all elements with the gf="capture" attribute
  // But only if they are inside an element with the gf="wrapper" attribute
  const flowList = $('[gf="wrapper"]').find('[gf="capture"]');

  // flowID is a basic counter, ensures imgs without a slug have unique filename
  let flowID = 1;

  // flowSettings contains the default values for each setting
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
    // ORDER OF PRECEDENCE
    // 1. Value from a gf="capture" element
    // 2. User input e.g. gf="scale-input" used on an html input
    // 3. Value from the gf="wrapper" element (this logic happens later in the code)
    // 4. Default value above
    let variableName = setting.variableName;
    let variableSafeName = setting.variableName + "Safe";
    let userValue = $('[gf="' + setting.attribute + '-input"]').val();
    let wrapperValue = $('[gf="wrapper"]').attr(`gf-${setting.attribute}`);
    let variableValue = userValue
      ? userValue
      : wrapperValue
      ? wrapperValue
      : setting.value;

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

    // Pushes the variable to the window object (global variable)
    window[variableSafeName] = variableValue;
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
      'div[gf=wrapper] img[src$=".svg"]:not([gf=ignore])'
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

  // Tells HTML2Cavnas to ignore all elements with the gf="ignore" attribute
  const ignoreElements = document.querySelectorAll('[gf="ignore"]');
  ignoreElements.forEach((element) => {
    element.setAttribute("data-html2canvas-ignore", "true");
  });

  // Gets current date in MMDDYY format
  let date =
    String(new Date().getMonth() + 1).padStart(2, "0") +
    String(new Date().getDate()).padStart(2, "0") +
    new Date().getFullYear().toString().slice(-2);

  // Vroom vroom, starts up JSZip
  const jsZipInstance = new JSZip();

  // Stores the labels of each image
  // This is used to check that each image has a unique filename
  const storedFlowLabels = [];

  // Creates the zip file name
  // It's done before the loop incase fileScale is overwritten below
  let zipScale = includeScaleZip ? `_@${fileScale}x` : "";
  let zipDate = includeDateZip ? `_${date}` : "";
  let zipLabel = `${zipName}${zipScale}${zipDate}.zip`;

  // Loops through each item in the flowList
  for (const flowItem of flowList) {
    // Checks if the item has any of the flowSettings
    // If it does, it will override the default
    flowSettings.forEach((setting) => {
      let itemAttributeValue = flowItem.getAttribute(`gf-${setting.attribute}`);
      if (itemAttributeValue) {
        let variableName = setting.variableName;
        let variableValue = itemAttributeValue;
        window[variableName] = variableValue;
      } else {
        // Avoids using an overwritten variable from a previous item
        // Look I know this wasn't the best way to do this but it works
        // If you have a better way to do this, please let me know
        let variableName = setting.variableName;
        let variableSafeName = setting.variableName + "Safe";
        window[variableName] = window[variableSafeName];
      }
    });
    // Converts the fileFormat to a MIME type
    let fileMime = fileFormat === "jpg" ? "image/jpeg" : `image/${fileFormat}`;

    // Gets the slug from the item
    const slugFromHTML = convertToSlug($(flowItem).find('[gf="slug"]').html());
    // If slugFromHTML is not set, it will use default.
    let imgName = slugFromHTML ? slugFromHTML : `img-${flowID}`;

    let imgScale = `_@${fileScale}x`;
    if (includeScaleImg != "true") {
      imgScale = "";
    }

    let imgDate = `_${date}`;
    if (includeDateImg != "true") {
      imgDate = "";
    }

    // Finalizes the label.
    let fileLabel = `${imgName}${imgScale}${imgDate}.${fileFormat}`;
    // Checks if the label has already been used
    // If it has, it will add a number to the end of the label
    if (storedFlowLabels.includes(imgName)) {
      fileLabel = `${imgName}-${flowID}${imgScale}${imgDate}.${fileFormat}`;
    }

    // Adds the label to the array of used labels
    storedFlowLabels.push(imgName);

    //Runs HTML2Canvas
    setTimeout(async function () {
      const canvas = await html2canvas(flowItem, {
        scale: fileScale,
        backgroundColor: null, // transparent background
      });

      // If there is only one image, it will download it
      if (flowList.length === 1) {
        canvas.toBlob(
          (blob) => {
            window.saveAs(blob, fileLabel);
          },
          fileMime,
          parseFloat(fileQuality)
        );
      }
      // If there are multiple images, it will add them to the zip file
      else {
        const flowDataURL = canvas.toDataURL(fileMime, parseFloat(fileQuality));
        const flowImg = document.createElement("img");
        flowImg.src = flowDataURL;

        jsZipInstance.file(
          fileLabel,
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
              saveAs(content, zipLabel);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
      flowID++; // increment counter each loop
    }, 500);
  }
}

$("[gf=trigger]").click(() => gennyFlow());
