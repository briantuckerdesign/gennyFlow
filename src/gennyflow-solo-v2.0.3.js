// gennyFlow Solo v2.0.3 (no dependencies)
// Created by Brian Tucker

/******************************************
.
.
Prep work before 
GennyFlow runs
.
.
*******************************************/

function convertIMGtoSVG() {
  let svgClass = "img.gf_img2svg";
  inlineSVG.init({
    svgSelector: svgClass, // the class attached to all images that should be inlined
    initClass: "js-inlinesvg", // class added to the inlined SVG
  });
}

// Set explicit height/width for inline <svg>'s (fixes HTML2Canvas issue)
function setSVGdimensions() {
  var svgElements = document.body.querySelectorAll("svg.gf_img2svg");
  svgElements.forEach(function (item) {
    item.setAttribute("width", item.getBoundingClientRect().width);
    item.setAttribute("height", item.getBoundingClientRect().height);
  });
}

// Gets current date in MMDDYY format
function formatDate() {
  const date = new Date();
  return (
    String(date.getMonth() + 1).padStart(2, "0") +
    String(date.getDate()).padStart(2, "0") +
    date.getFullYear().toString().substr(-2)
  );
}
// Converts input to slug formatting (lowercase, no spaces, no special characters)
function convertToSlug(input) {
  if (typeof input === "string") {
    return input
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .toLowerCase()
      .replace(/\s/g, "-");
  }
}

// Sanitizes input to remove HTML tags
function sanitizeInput(input) {
  if (typeof input === "string") {
    return input.replace(/<[^>]*>/g, "");
  }
}

/******************************************
.
.
GennyFlow
.
.
*******************************************/

function gennyFlow(options) {
  i = 0;
  options = options || {};
  if (options.enableVerbose) console.log("GennyFlow: running...");

  // Starts JS Zip
  const jsZipInstance = new JSZip();

  // DATE
  // Gets date for file labels
  const dateMMDDYY = formatDate();

  // MISC SETTINGS
  // All true by default
  const enableSVGfixes = options.enableSVGfix ? true : true;
  const enableAllowTaint = options.enableAllowTaint == false ? false : true;
  const enableUseCORS = options.enableUseCORS == false ? false : true;

  // ZIP NAME
  // Default: 'images.zip'
  // Order of precedence: input > options > default
  const zipNameFromUserInput = document.querySelector("[gennyflow=zipname]");
  const zipNameDefault = "images";
  const zipNameFromOptions = options.zipName || zipNameDefault;
  const zipFolderName = zipNameFromUserInput
    ? convertToSlug(zipNameFromUserInput.value)
    : zipNameFromOptions;

  // IMAGE SCALE
  // Default: 1
  // Order of precedence: input > options > default
  const scaleFromUserInput = document.querySelector("[gennyflow=scale]");
  const scaleDefault = 1;
  const scaleFromOptions = options.scale || scaleDefault;
  let scaleValue = scaleFromUserInput
    ? sanitizeInput(scaleFromUserInput.value)
    : scaleFromOptions;

  // FILE FORMAT
  // Default: 'png'
  // Order of precedence: input > options > default
  const fileFormatDefault = "png";
  const fileFormatFromOptions = options.fileFormat || fileFormatDefault;
  const fileFormatInput = document.querySelector("[gennyflow=fileformat]");
  const fileFormat = fileFormatInput
    ? sanitizeInput(fileFormatInput.value)
    : fileFormatFromOptions;
  const fileFormatMime =
    fileFormat === "png"
      ? "image/png"
      : fileFormat === "jpeg"
      ? "image/jpeg"
      : "image/webp";

  // JPG QUALITY - only works if fileFormat is 'jpg' or webp'
  // Default: 1
  // Order of precedence: input > options > default
  const jpgQualityFromUserInput = document.querySelector(
    "[gennyflow=jpgquality]"
  );
  const jpgQualityDefault = 1;
  const jpgQualityFromOptions = options.jpgQuality || jpgQualityDefault;
  const jpgQuality = jpgQualityFromUserInput
    ? sanitizeInput(jpgQualityFromUserInput.value)
    : jpgQualityFromOptions;

  // LABELS
  // Default: includes date and scale (e.g. 'image_062122_@2x.png')
  // This isn't set up for user input, but can be set in {options}
  const labelImgScale =
    options.labelImgScale !== false ? `_@${scaleValue}x` : "";
  const labelImgDate = options.labelImgDate !== false ? `_${dateMMDDYY}` : "";
  const labelZipScale =
    options.labelZipScale !== false ? `_@${scaleValue}x` : "";
  const labelZipDate = options.labelZipDate !== false ? `_${dateMMDDYY}` : "";

  // Shows settings in console
  if (options.enableVerbose) {
    console.log(`
GennyFlow Settings before run:

File Format: ${fileFormatMime}
Quality: ${jpgQuality}
Scale: ${scaleValue}

Img Label, Scale: ${labelImgScale}
Img Label, Date: ${labelImgDate}

Zip Name: ${zipFolderName}
Zip Label, Date: ${labelZipDate}
Zip Label, Scale: ${labelZipScale}

SVGs Fix: ${enableSVGfixes}
HTML2Canvas Allow Taint: ${enableAllowTaint}
HTML2Canvas Use CORS: ${enableUseCORS}
GennyFlow Verbose Logging: ${options.enableVerbose}
`);
  }

  // Gets list of elements to capture.
  const captureList = $('div[gennyflow="wrapper"]').find(
    '[gennyflow="capture"]'
  );
  if (options.enableVerbose)
    console.log("GennyFlow: " + captureList.length + " images to capture");

  // Fixes issue HTML2Canvas has with SVGs
  if (enableSVGfixes) {
    // Finds all <img>'s that end in .svg that are inside of a <div gennyflow="wrapper">, but don't contain the attribute gennyflow="ignore"
    const imgs = document.querySelectorAll(
      'div[gennyflow=wrapper] img[src$=".svg"]:not([gennyflow=ignore])'
    );
    imgs.forEach((img) => {
      img.classList.add("gf_img2svg");
    });
    if (options.enableVerbose)
      console.log(
        "GennyFlow: .gf_img2svg has been added to all 'gennyflow=svg' <img> elements"
      );
    convertIMGtoSVG();
    if (options.enableVerbose)
      console.log(
        "GennyFlow: <img> SVGs with class .gf_svg have been inlined."
      );
    setSVGdimensions();
    if (options.enableVerbose)
      console.log("GennyFlow: <svg> with .gf_svg height/width set");
  }
  const ignoreElements = document.querySelectorAll('[gennyflow="ignore"]');

  ignoreElements.forEach((element) => {
    element.setAttribute("data-html2canvas-ignore", "true");
  });

  /******************************************
    .
    Captures image(s) and either saves them to a zip file or downloads them individually, depending on the quantity. 
    (If there's only one image, it will download it instead of zipping it.)
    .
    *******************************************/
  async function gennyCapture() {
    let counter = 1; // used to label images with no slug

    // Creates a temporary staging area for generated images and appends it to the body
    const tempFiles = document.createElement("div");
    tempFiles.setAttribute("id", tempFiles);
    document.body.appendChild(tempFiles);

    // Loops through captureList and runs html2canvas to convert each div to a canvas
    for (const element of captureList) {
      try {
        // checks for custom scale value (i.e. gennyflow-scale="2" would export @2x for that one image)
        const scaleValueCustom = parseFloat(
          element.getAttribute("gennyflow-scale")
        );
        if (options.enableVerbose) {
          if (scaleValueCustom) {
            console.log("scaleValueCustom: ", scaleValueCustom);
          }
        }
        // if custom scale value exists, use it. Otherwise, use the default scale value
        const scaleFinal = scaleValueCustom ? scaleValueCustom : scaleValue;
        // formats scale value for label, leaves blank if user used labelImgScale: false
        const scaleFormatted =
          options.labelImgScale !== false ? `_@${scaleFinal}x` : "";
        const canvas = await html2canvas(element, {
          scale: scaleFinal,
          allowTaint: enableAllowTaint,
          useCORS: enableUseCORS,
          backgroundColor: null, // transparent background
        });

        const slug = convertToSlug(
          $(element).find('[gennyflow="slug"]').html()
        );
        let label; // declare label variable

        if (slug) {
          // if slug exists, use it as the label
          label = `${slug}${labelImgDate}${scaleFormatted}.${fileFormat}`;
        } else {
          // if slug doesn't exist, use the counter as the label
          label = `item-${counter}${labelImgDate}${scaleFormatted}.${fileFormat}`;
        }

        if (options.enableVerbose)
          console.log(`GennyFlow: Generating ${label}`);

        // Runs if there is only one image to capture
        // Directly downloads instead of zipping
        if (captureList.length === 1) {
          canvas.toBlob(
            (blob) => {
              window.saveAs(blob, label);
            },
            fileFormatMime,
            parseFloat(jpgQuality)
          );

          counter++; // increment counter on each iteration
        }

        // Runs if there are multiple images to capture
        // Adds images to a zip file
        else {
          // Sets format and quality
          const imgdata = canvas.toDataURL(
            fileFormatMime,
            parseFloat(jpgQuality)
          );
          const obj = document.createElement("img");
          obj.src = imgdata;

          jsZipInstance.file(label, obj.src.slice(obj.src.indexOf(",") + 1), {
            base64: true,
          });

          // This will append the image to the temporary staging div.
          $(tempFiles).append(`<img src="${obj.src}"/>`);

          // stops adding to the zip file once it's done
          const tempFilesLength =
            document.getElementById(tempFiles).children.length;

          // If all images have been captured, generate the zip file
          if (tempFilesLength === captureList.length) {
            jsZipInstance
              .generateAsync(
                {
                  type: "blob",
                },
                function updateCallback(metadata) {}
              )
              .then((content) => {
                const gfZipLabel = `${zipFolderName}${labelZipDate}${labelZipScale}`;
                saveAs(content, `${gfZipLabel}.zip`);

                if (options.enableVerbose) {
                  console.log("Zip Downloaded ");
                }
              })
              .catch((err) => {
                if (options.enableVerbose) {
                  console.log(err);
                }
              });
            document.body.removeChild(tempFiles);
          }
        }
      } catch (error) {
        console.log(error);
      }
      counter++; // increment counter on each iteration
    }
  }

  // Delays the function by 750ms to allow the page to render before capturing.
  setTimeout(async function () {
    await gennyCapture();
    if (options.enableVerbose) console.log("GennyFlow: Done");
  }, 750);
}
