// gennyFlow v1.1.1
// Created by Brian Tucker
// I only vaguely know what I'm doing. Care to help?
// 
// With contributions from Industry Dive, futuredivision, and hamza_teamalif
// Built on top of html2canvas, jszip, filesaver.js, and inline-svg


/*       Inline SVGs to fix size issue pt 1     */
function gfInlineSVG(gfSVGclass = 'gf_svg') {
    let svgClass = 'img.' + gfSVGclass;
    inlineSVG.init({
        svgSelector: svgClass, // the class attached to all images that should be inlined
        initClass: 'js-inlinesvg', // class added to <html>
    });
    console.log('SVG Bugfix Part 1: Inline SVGs. Class - .' + gfSVGclass);
}
gfInlineSVG();

/*       Date MMDDYY       */
function formatDate() {
    let genDate = new Date();
    let genDD = String(genDate.getDate()).padStart(2, "0");
    let genMM = String(genDate.getMonth() + 1).padStart(2, "0");
    let genYYYY = genDate.getFullYear();
    let genYY = genYYYY.toString().substr(-2);
    genDate = genMM + genDD + genYY;
    return genDate;
}

/*         gennyFlow main function         */

function gennyFlow(gf) {
    console.log('Running gennyFlow');
    i = 0;
    gf = gf || {};



    const gfDate = formatDate();
    console.log('Date: ' + gfDate);
    const tempFiles = 'gf_temp_files';
    const captureWrapperID = gf.captureWrapperID || 'gf_wrapper';
    const captureClass = gf.captureClass || '.gf_capture';
    const slugClass = gf.slugClass || 'gf_slug';
    console.log('Capture class: .' + captureClass + '. Wrapper ID: #' + captureWrapperID + '. Slug class: .' + slugClass);

    let debugSVG = gf.debugSVG == false ? false : true;
    let debugAllowTaint = gf.debugAllowTaint == false ? false : true;
    let debugUseCORS = gf.debugUseCORS == false ? false : true;
    console.log('Debug SVG: ' + debugSVG + '. AllowTaint: ' + debugAllowTaint + '. UseCORS: ' + debugUseCORS);

    /**************gfZipName*************/
    let getZipNameID = gf.getZipNameID || 'gf_zip_name';
    let setZipName = gf.setZipName ? gf.setZipName : 'images';
    let gfZipName = gf.getZipNameID ? document.getElementById(getZipNameID).value : setZipName;
    console.log('Zip name: ' + setZipName + ' ' + gfZipName + ' ' + getZipNameID);
    /************************************/


    let zip = new JSZip();    // Starts JSZip



    /**************gfScale*************/
    let getScaleID = gf.getScale || 'gf_scale';
    let setScale = gf.setScale || 1;
    // Order of priority: getScaleID -> setScale -> default (1)
    let gfScale = document.getElementById(getScaleID) ?
        document.getElementById(getScaleID).value :
        setScale;
    console.log('Final scale - ' + gfScale);
    /************************************/


    /**************imgLabelScale*************/
    let imgLabelScale = gf.imgLabelScale == false ? false : true;
    let gfScaleImg = imgLabelScale ? '_@' + gfScale + 'x' : '';
    console.log("imgLabelScale enabled: " + imgLabelScale + '. Formatted: ' + gfScaleImg);
    /************************************/


    /**************imgLabelDate*************/

    let imgLabelDate = gf.imgLabelDate == false ? false : true;
    let gfDateImg = imgLabelDate ? '_' + gfDate : '';
    console.log("imgLabelDate enabled: " + imgLabelDate + '. Formatted: ' + gfDateImg);
    /************************************/


    /**************zipLabelScale*************/
    let zipLabelScale = gf.zipLabelScale == false ? false : true;
    let gfScaleZip = zipLabelScale ? '_@' + gfScale + 'x' : '';
    console.log("zipLabelScale enabled: " + zipLabelScale + '. Formatted: ' + gfScaleZip);
    /************************************/


    /**************zipLabelDate*************/
    let zipLabelDate = gf.zipLabelDate == false ? false : true;
    let gfDateZip = zipLabelDate ? '_' + gfDate : '';
    console.log("zipLabelDate enabled: " + zipLabelDate + '. Formatted: ' + gfDateZip);
    /************************************/


    /*       Set SVG Height/Width bug fix pt 2       */
    if (debugSVG) {
        var svgElements = document.body.querySelectorAll('svg');
        svgElements.forEach(function (item) {
            item.setAttribute("width", item.getBoundingClientRect().width);
            item.setAttribute("height", item.getBoundingClientRect().height);
        });
        console.log('SVG Bugfix Part 2: SVGs height/width set');
    }



    /* ENDING TONIGHT HERE
    Current state:
    Vars all set up
    everything functioning until here
    
    Next steps: figure out why captureList[i].querySelector(slugClass).innerHTML is not working.*/

    const captureList = document.querySelectorAll('.gf_capture');
    console.log('Capture list length: ' + captureList.length);
    console.log(captureList[0].querySelector(".gf_slug").innerHTML);

    // // If capturelist only has one item, it runs a new function that doesn't require a loop.
    if (captureList.length == 1) {
        for (let i = 0; i < captureList.length; i++) {
            var label = 0;
            html2canvas(captureList[i], {
                scale: gfScale,
                allowTaint: debugAllowTaint,
                useCORS: debugUseCORS,
            }).then(canvas => {
                let exportSlug = captureList[i].querySelector(".gf_slug").innerHTML;
                console.log(exportSlug);
                let label = exportSlug + gfDateImg + gfScaleImg + ".png";
                canvas.toBlob(function (blob) {
                    window.saveAs(blob, label);
                });
            });
        }
    } else {
        // Creates a temporary staging area for generated images and appends it to the body
        let tempFiles = document.createElement("div");
        tempFiles.setAttribute("id", tempFiles);
        document.body.appendChild(tempFiles);
        console.log('Temp files div created');

        // Loops through captureList and runs html2canvas to convert each div to a canvas
        for (let i = 0; i < captureList.length + 1; i++) {
            html2canvas(captureList[i], {
                scale: gfScale,
                allowTaint: debugAllowTaint,
                useCORS: debugUseCORS,
            }).then((canvas) => {
                let exportSlug = captureList[i].querySelector(".gf_slug").innerHTML;
                console.log(exportSlug);
                let label = exportSlug + gfDateImg + gfScaleImg + ".png";
                console.log('HTML2Canvas run on:' + label);

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
                console.log(v);
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
                    console.log('Temp files div removed');
                }
            });
        }
    }
}