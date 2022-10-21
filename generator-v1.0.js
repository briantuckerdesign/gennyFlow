var zip = new JSZip();

//Finds each [.gen_capture] element and adds it to the list of items to generate images for
const capturelist = document.querySelectorAll(".gen_capture");

function genGenerate() {
    //Gets date (used in the file labels), formats it to MMDDYY
    let genDate = new Date();
    let genDD = String(genDate.getDate()).padStart(2, "0");
    let genMM = String(genDate.getMonth() + 1).padStart(2, "0");
    let genYYYY = genDate.getFullYear();
    let genYY = genYYYY.toString().substr(-2);
    genDate = genMM + genDD + genYY;

    //Defines scale of image export (@1x @2x etc) based on user input
    let genScale = document.getElementById("gen_scale-id").value;

    //Defines name folder of zip folder
    let genFolderName = document.getElementById("gen_folder-name").value;
    //idk?
    document.querySelector("#gen_images").innerHTML = "";

    //Loops through capturelist and runs html2canvas to convert each div to a canvas
    for (let i = 0; i < capturelist.length + 1; i++) {
        html2canvas(capturelist[i], {
            //Sets scale based on input
            scale: genScale,
        }).then((canvas) => {
            //Labels each file using [.gen_slug] and genScale
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


            //You should have a #gen_images div somewhere, it can be hidden. 
            $("#gen_images").append('<img src="' + obj.src + '"/>');
            //
            let v = document.querySelector("#gen_images").children.length;
            console.log(v)
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
            }
        });
    }
}