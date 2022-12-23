// gennyFlow Solo v1.9.0 (no dependencies)
// Created by Brian Tucker

/******************************************
.
.
Prep work before 
GennyFlow runs
.
.
*******************************************/

// Finds all <img> elements with class 'gf_svg' and converts them to inline <svg> (fixes HTML2Canvas issue)
// 'gf_svg' should only be added to <img> elements that are SVGs
function convertIMGtoSVG() {
    inlineSVG.init({
        svgSelector: "img.gf_svg",
        initClass: "js-inlinesvg"
    });
}

// Sets explicit height/width for inline <svg>'s (fixes HTML2Canvas issue)
function setSVGdimensions() {
    document.body.querySelectorAll("svg.gf_svg").forEach(item => {
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
    return input.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase().replace(/\s/g, "-");
}

// Sanitizes input to remove HTML tags
function sanitizeInput(input) {
    return input.replace(/<[^>]*>/g, "");
}
/******************************************
.
.
GennyFlow
.
.
*******************************************/

function gennyFlow(options) {
    if (options.verbose) {
        console.log('GennyFlow: running...');
    }
    i = 0;
    options = options || {};

    // Starts JS Zip
    const jsZipInstance = new JSZip();

    // Gets date for file labels
    const dateMMDDYY = formatDate();

    // Default settings
    const captureWrapperID = 'gf_wrapper'; // ID 
    const captureClass = '.gf_capture'; // Class
    const slugClass = 'gf_slug'; // Class

    // Misc settings
    const enableSVGfixes = options.debugSVG ? true : true;
    const enableAllowTaint = options.debugAllowTaint == false ? false : true; // Default: true
    const enableUseCORS = options.debugUseCORS == false ? false : true; // Default: true

    // ZIP NAME
    // Default: 'images.zip'
    // Order of precedence: input > options > default
    const zipNameFromUserInput = document.getElementById(options.zipNameInputID || 'gf_zip-name');
    const zipNameDefault = 'images';
    const zipNameFromOptions = options.zipName || zipNameDefault;
    const zipFolderName = zipNameFromUserInput ? convertToSlug(zipNameFromUserInput.value) : zipNameFromOptions;

    // IMAGE SCALE
    // Default: 1
    // Order of precedence: input > options > default
    const scaleFromUserInput = document.getElementById(options.scaleInputID || 'gf_scale');
    const scaleDefault = 1;
    const scaleFromOptions = options.scale || scaleDefault;
    const scaleValue = scaleFromUserInput ? sanitizeInput(scaleFromUserInput.value) : scaleFromOptions;

    // FILE FORMAT
    // Default: 'png'
    // Order of precedence: input > options > default
    const fileFormatDefault = 'png';
    const fileFormatFromOptions = options.fileFormat || fileFormatDefault;
    const fileFormatInput = document.getElementById(options.fileFormatInputID || 'gf_file-format');
    const fileFormat = fileFormatInput ? sanitizeInput(fileFormatInput.value) : fileFormatFromOptions;
    const fileFormatMime = (fileFormat === 'png') ? 'image/png' : 'image/jpeg';

    // JPG QUALITY - only used if fileFormat is 'jpg'
    // Default: 1
    // Order of precedence: input > options > default
    const jpgQualityInputID = options.jpgQualityInputID || 'gf_jpg-quality';
    const jpgQualityDefault = 1
    const jpgQualityFromOptions = options.jpgQuality || jpgQualityDefault;
    const jpgQualityFromUserInput = document.getElementById(jpgQualityInputID);
    const jpgQuality = jpgQualityFromUserInput ? sanitizeInput(jpgQualityFromUserInput.value) : jpgQualityFromOptions;
    
    // LABELS
    // Default: includes date and scale (e.g. 'image_062122_@2x.png')
    // This isn't set up for user input, but can be set in {options}
    const labelImgScale = options.labelImgScale !== false ? `_@${scaleValue}x` : '';
    const labelImgDate = options.labelImgDate !== false ? `_${dateMMDDYY}` : '';
    const labelZipScale = options.labelZipScale !== false ? `_@${scaleValue}x` : '';
    const labelZipDate = options.labelZipDate !== false ? `_${dateMMDDYY}` : '';

    // Shows settings in console
    if (options.verbose) {
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
GennyFlow Verbose Logging: ${options.verbose}
`);
    }

    // Gets list of elements to capture. 
    const captureList = document.getElementById(captureWrapperID).querySelectorAll(captureClass);
    if (options.verbose) {
        console.log('GennyFlow: ' + captureList.length + ' images to capture');
    }

    // Fixes issue HTML2Canvas has with SVGs
    if (enableSVGfixes) {
        convertIMGtoSVG();
        if (options.verbose) {
            console.log('GennyFlow: <img> SVGs with class .gf_svg have been inlined.');
        }
        setSVGdimensions();
        if (options.verbose) {
            console.log('GennyFlow: <svg> with .gf_svg height/width set');
        }
    }

    /******************************************
    .
    Captures only one image
    .
    *******************************************/
    async function soloCapture() {
        for (const element of captureList) {
            try {
                const canvas = await html2canvas(element, {
                    scale: scaleValue,
                    allowTaint: enableAllowTaint,
                    useCORS: enableUseCORS,
                    backgroundColor: null,
                });

                const exportSlug = element.querySelector('.gf_slug').innerHTML;
                const label = `${exportSlug}${labelImgDate}${labelImgScale}.${fileFormat}`;

                if (options.verbose) {
                    console.log(`GennyFlow: Generating ${label}`);
                }

                canvas.toBlob(
                    (blob) => {
                        window.saveAs(blob, label);
                    },
                    fileFormatMime,
                    parseFloat(jpgQuality)
                );
            } catch (error) {
                console.error(error);
            }
        }
    }



    /******************************************
    .
    Captures multiple images and zips them
    .
    *******************************************/
    async function multiCapture() {
        // Creates a temporary staging area for generated images and appends it to the body
        const tempFiles = document.createElement('div');
        tempFiles.setAttribute('id', tempFiles);
        document.body.appendChild(tempFiles);

        // Loops through captureList and runs html2canvas to convert each div to a canvas
        for (const element of captureList) {
            try {
                const canvas = await html2canvas(element, {
                    scale: scaleValue,
                    allowTaint: enableAllowTaint,
                    useCORS: enableUseCORS,
                    backgroundColor: null, // transparent background
                });

                const exportSlug = element.querySelector('.gf_slug').innerHTML;
                const label = `${exportSlug}${labelImgDate}${labelImgScale}.${fileFormat}`;

                if (options.verbose) {
                    console.log(`GennyFlow: Generating ${label}`);
                }

                const imgdata = canvas.toDataURL(fileFormatMime, parseFloat(jpgQuality));

                const obj = document.createElement('img');
                obj.src = imgdata;
                jsZipInstance.file(
                    label,
                    obj.src.substr(obj.src.indexOf(',') + 1), {
                        base64: true,
                    }
                );

                // This will append the image to the temporary staging div.
                $(tempFiles).append(`<img src="${obj.src}"/>`);

                // stops adding to the zip file once it's done
                const tempFilesLength = document.getElementById(tempFiles).children.length;

                // If all images have been captured, generate the zip file
                if (tempFilesLength === document.getElementById(captureWrapperID).children.length) {
                    jsZipInstance
                        .generateAsync({
                                type: 'blob',
                            },
                            function updateCallback(metadata) {}
                        )
                        .then((content) => {
                            const gfZipLabel = `${zipFolderName}${labelZipDate}${labelZipScale}`;
                            saveAs(content, `${gfZipLabel}.zip`);

                            if (options.verbose) {
                                console.log('Zip Downloaded ');
                            }
                        })
                        .catch((err) => {
                            if (options.verbose) {
                                console.log(err);
                            }
                        });
                    document.body.removeChild(tempFiles);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }


    // If capturelist only has one item, it runs a new function that doesn't require a loop.
    // Delays the function by 750ms to allow the page to render before capturing.
    setTimeout(async function () {
        if (captureList.length === 1) {
            await soloCapture();
        } else {
            await multiCapture();
        }
    }, 750);
}