// gennyFlow v1.5.0
// Created by Brian Tucker
// I only vaguely know what I'm doing. Care to help?
// 
// With contributions from Industry Dive, futuredivision, and hamza_teamalif
// Built on top of html2canvas, jszip, filesaver.js, and inline-svg

// dependencies not included on this version

/**************SVG bug fixes*************/
function gfInlineSVG() {
    let svgClass = 'img.gf_svg';
    inlineSVG.init({
        svgSelector: svgClass, // the class attached to all images that should be inlined
        initClass: 'js-inlinesvg', // class added to <html>
    });
    console.log('GennyFlow: img SVGs with class .gf_svg have been inlined.');
}

function setSVGdimensions() {
    var svgElements = document.body.querySelectorAll('svg.gf_svg');
    svgElements.forEach(function (item) {
        item.setAttribute("width", item.getBoundingClientRect().width);
        item.setAttribute("height", item.getBoundingClientRect().height);
    });
    console.log('GennyFlow: SVGs with .gf_svg height/width set');
}


/**************get date MMDDYY*************/
function formatDate() {
    let genDate = new Date();
    let genDD = String(genDate.getDate()).padStart(2, "0");
    let genMM = String(genDate.getMonth() + 1).padStart(2, "0");
    let genYYYY = genDate.getFullYear();
    let genYY = genYYYY.toString().substr(-2);
    genDate = genMM + genDD + genYY;
    return genDate;
}


/***************************************gennyFlow function*************************************/

function gennyFlow(gf) {
    console.log('GennyFlow: running...');
    i = 0;
    gf = gf || {};

    /**************misc variables*************/
    const gfDate = formatDate();
    const tempFiles = 'gf_temp_files';
    const captureWrapperID = gf.captureWrapperID || 'gf_wrapper';
    const captureClass = gf.captureClass || '.gf_capture';
    const slugClass = gf.slugClass || 'gf_slug';
    let debugSVG = gf.debugSVG == false ? false : true;
    let debugAllowTaint = gf.debugAllowTaint == false ? false : true;
    let debugUseCORS = gf.debugUseCORS == false ? false : true;
    let zip = new JSZip();    // Starts JSZip

    /**************gfZipName*************/
    let zipNameInputID = gf.zipNameInputID ? gf.zipNameInputID : 'gf_zip-name';
    let zipName = gf.zipName ? gf.zipName : 'images';
    let gfZipName = document.getElementById(zipNameInputID) ? document.getElementById(zipNameInputID).value : zipName;

    /**************gfScale*************/
    // Order of priority: scaleInputID -> scaleManual -> default (1)
    let scaleInputID = gf.getScale || 'gf_scale';
    let scaleManual = gf.scale || 1;
    let gfScale = document.getElementById(scaleInputID) ? document.getElementById(scaleInputID).value : scaleManual;

    /**************labelImgScale*************/
    let labelImgScale = gf.labelImgScale == false ? false : true;
    let gfScaleImg = labelImgScale ? '_@' + gfScale + 'x' : '';

    /**************labelImgDate*************/
    let labelImgDate = gf.labelImgDate == false ? false : true;
    let gfDateImg = labelImgDate ? '_' + gfDate : '';

    /**************labelZipScale*************/
    let labelZipScale = gf.labelZipScale == false ? false : true;
    let gfScaleZip = labelZipScale ? '_@' + gfScale + 'x' : '';

    /**************labelZipDate*************/
    let labelZipDate = gf.labelZipDate == false ? false : true;
    let gfDateZip = labelZipDate ? '_' + gfDate : '';


    if (debugSVG) {
        gfInlineSVG();
        setSVGdimensions();
    }
    /**************capture 1 item*************/
    function soloCapture() {
        for (let i = 0; i < captureList.length; i++) {
            var label = 0;
            html2canvas(captureList[i], {
                scale: gfScale,
                allowTaint: debugAllowTaint,
                useCORS: debugUseCORS,
            }).then(canvas => {
                let exportSlug = captureList[i].querySelector(".gf_slug").innerHTML;
                let label = exportSlug + gfDateImg + gfScaleImg + ".png";
                console.log('GennyFlow: Generating ' + label);
                canvas.toBlob(function (blob) {
                    window.saveAs(blob, label);
                });
            });
        }
    }

    /**************capture multiple items*************/
    function multiCapture() {
        // Creates a temporary staging area for generated images and appends it to the body
        let tempFiles = document.createElement("div");
        tempFiles.setAttribute("id", tempFiles);
        document.body.appendChild(tempFiles);

        // Loops through captureList and runs html2canvas to convert each div to a canvas
        for (let i = 0; i < captureList.length + 1; i++) {
            html2canvas(captureList[i], {
                scale: gfScale,
                allowTaint: debugAllowTaint,
                useCORS: debugUseCORS,
            }).then((canvas) => {
                let exportSlug = captureList[i].querySelector(".gf_slug").innerHTML;
                let label = exportSlug + gfDateImg + gfScaleImg + ".png";
                console.log('GennyFlow: Generating ' + label);

                let imgdata = canvas.toDataURL("image/png");
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
                let v = document.getElementById(tempFiles).children.length;
                if (v == document.getElementById(captureWrapperID).children.length) {
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

                            console.log('Zip Downloaded ');
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


    // Gets list of elements to capture. 
    const captureList = document.getElementById(captureWrapperID).querySelectorAll('.gf_capture');
    console.log('GennyFlow: ' + captureList.length + ' images to capture');

    // If capturelist only has one item, it runs a new function that doesn't require a loop.
    if (captureList.length == 1) {
        soloCapture();
    } else {
        multiCapture();

    }
}