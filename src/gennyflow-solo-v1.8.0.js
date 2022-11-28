// gennyFlow Solo v1.8.0 (no dependencies)
// Created by Brian Tucker

/******************************************
.
.
Prep work before 
GennyFlow runs
.
.
*******************************************/

// Converts svgs loaded through <img> to inline <svg> (fixes HTML2Canvas issue)
function gfInlineSVG() {
    let svgClass = 'img.gf_svg';
    inlineSVG.init({
        svgSelector: svgClass, // the class attached to all images that should be inlined
        initClass: 'js-inlinesvg', // class added to the inlined SVG
    });
}

// Set explicit height/width for inline <svg>'s (fixes HTML2Canvas issue)
function setSVGdimensions() {
    var svgElements = document.body.querySelectorAll('svg.gf_svg');
    svgElements.forEach(function (item) {
        item.setAttribute("width", item.getBoundingClientRect().width);
        item.setAttribute("height", item.getBoundingClientRect().height);
    });
}

// Gets current date in MMDDYY format
function formatDate() {
    let genDate = new Date();
    let genDD = String(genDate.getDate()).padStart(2, "0");
    let genMM = String(genDate.getMonth() + 1).padStart(2, "0");
    let genYYYY = genDate.getFullYear();
    let genYY = genYYYY.toString().substr(-2);
    genDate = genMM + genDD + genYY;
    return genDate;
}


/******************************************
.
.
GennyFlow
.
.
*******************************************/

function gennyFlow(gf) {
    if (gf.verbose){console.log('GennyFlow: running...');}
    i = 0;
    gf = gf || {};

    // Starts JS Zip
    let zip = new JSZip();

    // Gets date for file labels
    const gfDate = formatDate();

    // Default settings
    const captureWrapperID = 'gf_wrapper'; // ID 
    const captureClass = '.gf_capture'; // Class
    const slugClass = 'gf_slug'; // Class
    
    // Misc settings
    let svgFix = gf.debugSVG == false ? false : true; // Default: true
    let h2cAllowTaint = gf.debugAllowTaint == false ? false : true; // Default: true
    let h2cCORS = gf.debugUseCORS == false ? false : true; // Default: true

    // Sets zip file name
    let zipNameInputID = gf.zipNameInputID ? gf.zipNameInputID : 'gf_zip-name'; // Input ID
    let zipName = gf.zipName ? gf.zipName : 'images'; // Default
    let gfZipName = document.getElementById(zipNameInputID) ? document.getElementById(zipNameInputID).value : zipName; // If input ID exists, use instead of default

    // Sets image scale
    let scaleInputID = gf.scaleInputID || 'gf_scale'; // Input ID
    let scaleManual = gf.scale || 1; // Default
    let gfScale = document.getElementById(scaleInputID) ? document.getElementById(scaleInputID).value : scaleManual; // If input ID exists, use instead of default

    // Sets file format (png/jpg)
    let fileFormatInputID = gf.fileFormatInputID || 'gf_file-format'; // Input ID
    let fileFormat = gf.fileFormat || 'png'; // Default: .png
    let gfFileFormat = document.getElementById(fileFormatInputID) ? document.getElementById(fileFormatInputID).value : fileFormat;
    let gfJPGsettings = 'image/jpeg';
    let gfPNGsettings = 'image/png';
    let gfFileFormatSettings = (gfFileFormat == 'png') ? gfPNGsettings : gfJPGsettings;

    // Sets JPG quality
    let jpgQualityInputID = gf.jpgQualityInputID || 'gf_jpg-quality'; // Input ID
    let jpgQualityManual = gf.jpgQuality || 1; // Default
    let gfJPGquality = document.getElementById(jpgQualityInputID) ? document.getElementById(jpgQualityInputID).value : jpgQualityManual; // If input ID exists, use instead of default
    
    // Sets image label: include scale
    let labelImgScale = gf.labelImgScale == false ? false : true; // Default: true
    let gfScaleImg = labelImgScale ? '_@' + gfScale + 'x' : '';

    // Sets image label: include date
    let labelImgDate = gf.labelImgDate == false ? false : true; // Default: true
    let gfDateImg = labelImgDate ? '_' + gfDate : '';

    // Sets zip label: include scale
    let labelZipScale = gf.labelZipScale == false ? false : true; // Default: true
    let gfScaleZip = labelZipScale ? '_@' + gfScale + 'x' : '';

    // Sets zip label: include date
    let labelZipDate = gf.labelZipDate == false ? false : true; // Default: true
    let gfDateZip = labelZipDate ? '_' + gfDate : '';

    // Shows settings in console
    if (gf.verbose){console.log(`
GennyFlow Settings before run:

File Format: ${gfFileFormat}
Quality: ${gfJPGquality}
Scale: ${gfScale}

Img Label, Scale: ${labelImgScale}
Img Label, Date: ${labelImgDate}

Zip Name: ${gfZipName}
Zip Label, Date: ${labelZipDate}
Zip Label, Scale: ${labelZipScale}

SVGs Fix: ${svgFix}
HTML2Canvas Allow Taint: ${h2cAllowTaint}
HTML2Canvas Use CORS: ${h2cCORS}
GennyFlow Verbose Logging: ${gf.verbose}
`);}

    // Gets list of elements to capture. 
    const captureList = document.getElementById(captureWrapperID).querySelectorAll(captureClass);
    if (gf.verbose){console.log('GennyFlow: ' + captureList.length + ' images to capture');}

    // Fixes issue HTML2Canvas has with SVGs
    if (svgFix) {
        gfInlineSVG();
        if (gf.verbose){console.log('GennyFlow: img SVGs with class .gf_svg have been inlined.');}
        setSVGdimensions();
        if (gf.verbose){console.log('GennyFlow: SVGs with .gf_svg height/width set');}
    }

    /******************************************
    .
    Captures only one image
    .
    *******************************************/
    function soloCapture() {
        for (let i = 0; i < captureList.length; i++) {
            var label = 0;
            html2canvas(captureList[i], {
                scale: gfScale,
                allowTaint: h2cAllowTaint,
                useCORS: h2cCORS,
                backgroundColor: null,
            }).then(canvas => {
                let exportSlug = captureList[i].querySelector(`${slugClass}`).innerHTML;
                let label = exportSlug + gfDateImg + gfScaleImg + "." + gfFileFormat;
                if (gf.verbose){console.log('GennyFlow: Generating ' + label);}
                canvas.toBlob(function (blob) {
                    window.saveAs(blob, label);
                }, gfFileFormatSettings, parseFloat(gfJPGquality));
            });
        }
    }

    /******************************************
    .
    Captures multiple images
    .
    *******************************************/
    function multiCapture() {

        // Creates a temporary staging area for generated images and appends it to the body
        let tempFiles = document.createElement("div");
        tempFiles.setAttribute("id", tempFiles);
        document.body.appendChild(tempFiles);

        // Loops through captureList and runs html2canvas to convert each div to a canvas
        for (let i = 0; i < captureList.length + 1; i++) {
            html2canvas(captureList[i], { //HTML2Canvas settings go here
                scale: gfScale,
                allowTaint: h2cAllowTaint,
                useCORS: h2cCORS,
                backgroundColor: null, // transparent background
            }).then((canvas) => {
                let exportSlug = captureList[i].querySelector(".gf_slug").innerHTML; // Sets slug
                let label = exportSlug + gfDateImg + gfScaleImg + "." + gfFileFormat; // Sets label
                if (gf.verbose){console.log('GennyFlow: Generating ' + label);}
                let imgdata = canvas.toDataURL(gfFileFormatSettings, parseFloat(gfJPGquality)); // Sets format/quality

                let obj = document.createElement("img");
                obj.src = imgdata;
                zip.file(
                    label,
                    obj.src.substr(obj.src.indexOf(",") + 1),
                    {
                        base64: true,
                    }
                );

                // This will append the image to the temporary staging div.
                $(tempFiles).append('<img src="' + obj.src + '"/>');

                // stops adding to the zip file once it's done
                let tempFilesLength = document.getElementById(tempFiles).children.length;
                
                // If all images have been captured, generate the zip file
                if (tempFilesLength == document.getElementById(captureWrapperID).children.length) {
                    zip
                        .generateAsync(
                            {
                                type: "blob",
                            },
                            function updateCallback(metadata) { }
                        )
                        .then(function (content) {
                            let gfZipLabel = gfZipName + gfDateZip + gfScaleZip;
                            saveAs(
                                content,
                                gfZipLabel + ".zip"
                            );

                            if (gf.verbose){console.log('Zip Downloaded ');}
                        })
                        .catch((err) => {
                            if (gf.verbose){console.log(err);}
                        });
                        document.body.removeChild(tempFiles);
                }
            })
            .catch((err) => {
                if (gf.verbose){console.log(err);}
            });
        }
    }
    // If capturelist only has one item, it runs a new function that doesn't require a loop.
    setTimeout(function () {
        if (captureList.length == 1) {
            soloCapture();
        } else {
            multiCapture();
        }
    }, 750);
}