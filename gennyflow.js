/*


Ending today on an L
Looks like you can't define define the settings when calling the function so that you could call
it more than once... but no dice. I think I thought I could do it because of python.
I'm going to have to figure out how to do this in a different way.

The bones are probably fine though.




*/

// GennyFlow v1.1.0
// Created by Brian Tucker
// I only vaguely know what I'm doing. Care to help?
// 
// With contributions from Industry Dive, futuredivision, and hamza_teamalif
// Built on top of html2canvas, jszip, filesaver.js, and inline-svg



/********************Default Settings*********************/
let debugSVG = true;
let debugAllowTaint = true;
let debugUseCORS = true;
let tempFilesID = "genny_temp"


/********************Misc tasks*********************/

// Converts all <img> SVGs to inline SVGs so they can be captured correctly by HTML2Canvas
// I wish I could put  gennyInlineSVG()  in the main function, but I can't get it to work there.
function gennyInlineSVG(gennySVGclass) {
    let svgClass = 'img.' + gennySVGclass;
    inlineSVG.init({
        svgSelector: svgClass, // the class attached to all images that should be inlined
        initClass: 'js-inlinesvg', // class added to <html>
    });
}

// Gets date and formats it to MMDDYY.
function formatDate() {
    let genDate = new Date();
    let genDD = String(genDate.getDate()).padStart(2, "0");
    let genMM = String(genDate.getMonth() + 1).padStart(2, "0");
    let genYYYY = genDate.getFullYear();
    let genYY = genYYYY.toString().substr(-2);
    genDate = genMM + genDD + genYY;
    return genDate;
}


/********************Main Function*********************/

function gennyFlow(
    captureContainerID,
    captureClass,
    slugClass,
    setScale,
    userScaleID,
    userZipNameID,
    setZipName,
    fileLabelDate,
    fileLabelScale,
    zipLabelDate,
    zipLabelScale,
    debugSVG,
    debugAllowTaint,
    debugUseCORS,
    tempFilesID
) {

    /********************SVG Issues*********************/

    // Sets height/width for all svgs on the page. Can fix an svg sizing issue.
    if (debugSVG) {
        var svgElements = document.body.querySelectorAll('svg');
        svgElements.forEach(function (item) {
            item.setAttribute("width", item.getBoundingClientRect().width);
            item.setAttribute("height", item.getBoundingClientRect().height);
        });
    }



    /********************User Input and File Labeling*********************/

    // Gets formatted date (MMDDYY)
    let exportDate = formatDate();


    /*      Scale Things      */

    // If userScaleID is set, use it, otherwise use the init setScale, otherwise use 1.
    // I think you can combine these ternary operators but I'm not smart enough.
    const jsSetScale = setScale ? setScale : 1;
    const finalScale = userScaleID ? document.getElementById(userScaleID) : jsSetScale;

    // When enabled, includes date (MMDDYY) in individual file names (e.g. 'slug_102222.png')
    const finalFileDate = fileLabelDate ? '_' + exportDate : '';

    // When enabled, includes scale in individual file names (e.g. 'slug_102222_@2x.png')
    const finalFileScale = fileLabelScale ? '_@' + finalScale + "x" : '';

    // When enabled, includes date (MMDDYY) in zip file name (e.g. 'images_102222.zip')
    const finalZipDate = zipLabelDate ? '_' + exportDate : '';

    // When enabled, includes scale in zip file name (e.g. 'images_102222_@2x.zip')
    const finalZipScale = zipLabelScale ? '_@' + finalScale + "x" : '';


    // If userZipNameID is set, use it, otherwise use the init setZipName, otherwise use 'images'.
    const jsSetZipName = setZipName ? setZipName : 'images';
    const finalZipName = userZipNameID ? document.getElementById(userFolderNameID) : jsSetZipName;



    /********************Where things actually happen*********************/

    // Starts JSZip
    let zip = new JSZip();

    // Finds each element to be captured
    const captureList = document.querySelectorAll(captureClass);

    // If capturelist only has one item, it runs a new function that doesn't require a loop.
    if (captureList.length == 1) {
        for (let i = 0; i < captureList.length; i++) {
            var label = 0;
            html2canvas(captureList[i], {
                scale: finalScale,
                allowTaint: debugAllowTaint,
                useCORS: debugUseCORS,
            }).then(canvas => {
                let exportSlug = captureList[i].querySelector(slugClass).innerHTML;
                let label = exportSlug + finalFileDate + finalFileScale + ".png";
                canvas.toBlob(function (blob) {
                    window.saveAs(blob, label);
                });
            });
        }
    } else {
        // Creates a temporary staging area for generated images and appends it to the body
        let tempFiles = document.createElement("div");
        tempFiles.setAttribute("id", tempFilesID);
        document.body.appendChild(tempFiles);

        // Loops through captureList and runs html2canvas to convert each div to a canvas
        for (let i = 0; i < captureList.length + 1; i++) {
            html2canvas(captureList[i], {
                scale: finalScale,
                allowTaint: debugAllowTaint,
                useCORS: debugUseCORS,
            }).then((canvas) => {
                let exportSlug = captureList[i].querySelector(slugClass).innerHTML;
                let label = exportSlug + finalFileDate + finalFileScale;

                let imgdata = canvas.toDataURL("image/png");
                let obj = document.createElement("img");
                obj.src = imgdata;
                zip.file(
                    label + ".png",
                    obj.src.substr(obj.src.indexOf(",") + 1),
                    {
                        base64: true,
                    }
                );


                // This will append the image to the temporary staging div.
                $(tempFiles).append('<img src="' + obj.src + '"/>');
                // stops adding to the zip file once it's done
                let v = document.querySelector(tempFiles).children.length;
                console.log(v);
                if (v == document.querySelector(captureContainerID).children.length) {
                    zip
                        .generateAsync(
                            {
                                type: "blob",
                            },
                            function updateCallback(metadata) { }
                        )
                        .then(function (content) {
                            saveAs(
                                content,
                                finalZipName + finalZipDate + finalZipScale + ".zip"
                            );
                        })
                        .catch((err) => {
                            console.log(err);
                        });

                    // Removes the temporary staging area
                    document.body.removeChild(tempFiles);
                }
            });
        }
    }
}