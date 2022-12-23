// gennyFlow Solo v2.0.0 (no dependencies)
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
    let svgClass = 'img.gf_img2svg';
    inlineSVG.init({
        svgSelector: svgClass, // the class attached to all images that should be inlined
        initClass: 'js-inlinesvg', // class added to the inlined SVG
    });
}

// Set explicit height/width for inline <svg>'s (fixes HTML2Canvas issue)
function setSVGdimensions() {
    var svgElements = document.body.querySelectorAll('svg.gf_img2svg');
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
    i = 0;
    options = options || {};
    if (options.enableVerbose) {
        console.log('GennyFlow: running...');
    }
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
    const zipNameFromUserInput = document.querySelector('[gennyflow=zipname]');
    const zipNameDefault = 'images';
    const zipNameFromOptions = options.zipName || zipNameDefault;
    const zipFolderName = zipNameFromUserInput ? convertToSlug(zipNameFromUserInput.value) : zipNameFromOptions;

    // IMAGE SCALE
    // Default: 1
    // Order of precedence: input > options > default
    const scaleFromUserInput = document.querySelector('[gennyflow=scale]');
    const scaleDefault = 1;
    const scaleFromOptions = options.scale || scaleDefault;
    const scaleValue = scaleFromUserInput ? sanitizeInput(scaleFromUserInput.value) : scaleFromOptions;

    // FILE FORMAT
    // Default: 'png'
    // Order of precedence: input > options > default
    const fileFormatDefault = 'png';
    const fileFormatFromOptions = options.fileFormat || fileFormatDefault;
    const fileFormatInput = document.querySelector('[gennyflow=fileformat]');
    const fileFormat = fileFormatInput ? sanitizeInput(fileFormatInput.value) : fileFormatFromOptions;
    const fileFormatMime = (fileFormat === 'png') ? 'image/png' : 'image/jpeg';

    // JPG QUALITY - only used if fileFormat is 'jpg'
    // Default: 1
    // Order of precedence: input > options > default
    const jpgQualityFromUserInput = document.querySelector('[gennyflow=jpgquality]');    
    const jpgQualityDefault = 1
    const jpgQualityFromOptions = options.jpgQuality || jpgQualityDefault;
    const jpgQuality = jpgQualityFromUserInput ? sanitizeInput(jpgQualityFromUserInput.value) : jpgQualityFromOptions;

    // LABELS
    // Default: includes date and scale (e.g. 'image_062122_@2x.png')
    // This isn't set up for user input, but can be set in {options}
    const labelImgScale = options.labelImgScale !== false ? `_@${scaleValue}x` : '';
    const labelImgDate = options.labelImgDate !== false ? `_${dateMMDDYY}` : '';
    const labelZipScale = options.labelZipScale !== false ? `_@${scaleValue}x` : '';
    const labelZipDate = options.labelZipDate !== false ? `_${dateMMDDYY}` : '';

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
    const captureList = $('div[gennyflow="wrapper"]').find('[gennyflow="capture"]')
    if (options.enableVerbose) {
        console.log('GennyFlow: ' + captureList.length + ' images to capture');
    }

    // Fixes issue HTML2Canvas has with SVGs
    if (enableSVGfixes) {
        const imgs = document.querySelectorAll('div[gennyflow=wrapper] img[src$=".svg"]');
        // const imgs = document.querySelectorAll('img[gennyflow=svg]');
        imgs.forEach(img => {
            img.classList.add('gf_img2svg');
        });
        if (options.enableVerbose) {
            console.log("GennyFlow: .gf_img2svg has been added to all 'gennyflow=svg' <img> elements");
        }

        convertIMGtoSVG();
        if (options.enableVerbose) {
            console.log('GennyFlow: <img> SVGs with class .gf_svg have been inlined.');
        }
        setSVGdimensions();
        if (options.enableVerbose) {
            console.log('GennyFlow: <svg> with .gf_svg height/width set');
        }
    }

    /******************************************
    .
    Captures only one image
    .
    *******************************************/
    async function soloCapture() {
        let counter = 1; // add counter variable

        for (const element of captureList) {
            try {
                const canvas = await html2canvas(element, {
                    scale: scaleValue,
                    allowTaint: enableAllowTaint,
                    useCORS: enableUseCORS,
                    backgroundColor: null,
                });

                const slug = convertToSlug($(element).find('[gennyflow="slug"]').html());
                let label; // declare label variable

                if (slug) { // if slug exists, use it as the label
                    label = `${slug}${labelImgDate}${labelImgScale}.${fileFormat}`;
                } else { // if slug doesn't exist, use the counter as the label
                    label = `img-${counter}${labelImgDate}${labelImgScale}.${fileFormat}`;
                }

                if (options.enableVerbose) {
                    console.log(`GennyFlow: Generating ${label}`);
                }

                canvas.toBlob(
                    (blob) => {
                        window.saveAs(blob, label);
                    },
                    fileFormatMime,
                    parseFloat(jpgQuality)
                );

                counter++; // increment counter on each iteration
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
        let counter = 1; // add counter variable

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

                const slug = convertToSlug($(element).find('[gennyflow="slug"]').html());
                let label; // declare label variable

                if (slug) { // if slug exists, use it as the label
                    label = `${slug}${labelImgDate}${labelImgScale}.${fileFormat}`;
                } else { // if slug doesn't exist, use the counter as the label
                    label = `item-${counter}${labelImgDate}${labelImgScale}.${fileFormat}`;
                }

                if (options.enableVerbose) {
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
                if (tempFilesLength === captureList.length) {
                    jsZipInstance
                        .generateAsync({
                                type: 'blob',
                            },
                            function updateCallback(metadata) {}
                        )
                        .then((content) => {
                            const gfZipLabel = `${zipFolderName}${labelZipDate}${labelZipScale}`;
                            saveAs(content, `${gfZipLabel}.zip`);

                            if (options.enableVerbose) {
                                console.log('Zip Downloaded ');
                            }
                        })
                        .catch((err) => {
                            if (options.enableVerbose) {
                                console.log(err);
                            }
                        });
                    document.body.removeChild(tempFiles);
                }
            } catch (error) {
                console.log(error);
            }
            counter++; // increment counter on each iteration
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