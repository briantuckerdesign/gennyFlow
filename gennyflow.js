// GennyFlow v1.0.3
// Created by Brian Tucker
// With contributions from Industry Dive, futuredivision, and hamza_teamalif
// Built on top of html2canvas, jszip, filesaver.js, and inline-svg

// This function runs HTML2Canvas on each [.gen_capture] element inside of [#gen_wrapper].
// It then converts the canvas into a dataURL PNG and labels it using [.gen_slug]. This must be inside of the [.gen_capture] element and can be hidden.
// It appends the image to the [#gen_images] div, which can be hidden.
// It continues doing this until the number of items in [#gen_images] is equal to the number of items in [#gen_wrapper].
// Then it creates a zip file and saves it to the user's computer.
// The zip file is named using the user's input from [#gen_folder-name] and the date.

// Converts all <img> SVGs to inline SVGs so they can be captured correctly by HTML2Canvas
// Fixes issue where svgs are not rendered correctly in the canvas.
inlineSVG.init({
    svgSelector: 'img.gen_svg', // the class attached to all images that should be inlined
    initClass: 'js-inlinesvg', // class added to <html>
}, function () {
    console.log('All SVGs inlined');
});

function genGenerate() {

    // Sets height/width for all svgs on the page.
    var svgElements = document.body.querySelectorAll('svg');
    svgElements.forEach(function (item) {
        item.setAttribute("width", item.getBoundingClientRect().width);
        item.setAttribute("height", item.getBoundingClientRect().height);
    });

    // Starts JSZip
    let zip = new JSZip();

    // Finds each [.gen_capture]
    const capturelist = document.querySelectorAll(".gen_capture");

    // Gets date, formats it to MMDDYY
    let genDate = new Date();
    let genDD = String(genDate.getDate()).padStart(2, "0");
    let genMM = String(genDate.getMonth() + 1).padStart(2, "0");
    let genYYYY = genDate.getFullYear();
    let genYY = genYYYY.toString().substr(-2);
    genDate = genMM + genDD + genYY;

    // Defines scale of image export (@1x @2x etc) based on user input.
    // If genScale is not defined, it defaults to 1.
    var genScale = document.getElementById("gen_scale-id");
    if (genScale) {
        var genScale = genScale.value;
    } else {
        var genScale = 1;
    }

    // Defines folder name based on user input.
    // If genFolderName is not defined, it defaults to "export".
    var genFolderName = document.getElementById("gen_folder-name");
    if (genFolderName) {
        var genFolderName = genFolderName.value;
    } else {
        var genFolderName = "export";
    }

    // If capturelist only has one item, it runs a new function that doesn't require a loop.
    if (capturelist.length == 1) {
        for (let i = 0; i < capturelist.length; i++) {
            var label = 0;
            html2canvas(capturelist[i], {
                scale: genScale,
                allowTaint: true,
                useCORS: true,
            }).then(canvas => {
                var label = capturelist[i].querySelector(".gen_slug").innerHTML + "_@" + genScale + "x" + ".png";
                canvas.toBlob(function (blob) {
                    window.saveAs(blob, label);
                });
            });
        }
    } else {
        // Creates a temporary staging area for generated images and appends it to the body
        let genStagingGround = document.createElement("div");
        genStagingGround.setAttribute("id", "gen_staging-ground");
        document.body.appendChild(genStagingGround);

        // Loops through capturelist and runs html2canvas to convert each div to a canvas
        for (let i = 0; i < capturelist.length + 1; i++) {
            html2canvas(capturelist[i], {
                // Sets scale based on input
                scale: genScale,
                allowTaint: true,
                useCORS: true,
            }).then((canvas) => {
                // Labels each file using [.gen_slug] and genScale
                let label = capturelist[i].querySelector(".gen_slug").innerHTML + "_" + genDate + "-@" + genScale + "x";

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


                // This will append the image to the #gen_staging-ground div.
                $("#gen_staging-ground").append('<img src="' + obj.src + '"/>');
                // stops adding to the zip file once it's done
                let v = document.querySelector("#gen_staging-ground").children.length;
                console.log(v);
                if (v == document.querySelector("#gen_wrapper").children.length) {
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
                                genFolderName + "_" + genDate + "_@" + genScale + "x" + ".zip"
                            );
                        })
                        .catch((err) => {
                            console.log(err);
                        });

                    // Removes the temporary staging area
                    document.body.removeChild(genStagingGround);
                }
            });
        }
    }
}