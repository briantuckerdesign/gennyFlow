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
    console.log('SVGs inlined');
}

/*       Date MMDDYY       */
function formatDate() {
    let genDate = new Date();
    let genDD = String(genDate.getDate()).padStart(2, "0");
    let genMM = String(genDate.getMonth() + 1).padStart(2, "0");
    let genYYYY = genDate.getFullYear();
    let genYY = genYYYY.toString().substr(-2);
    genDate = genMM + genDD + genYY;
    console.log('Date formatted');
    return genDate;
}
let gfGetDate = formatDate();


// let captureContainerID = 'gf_container';
// let captureClass = 'gf_capture';
// let slugClass = 'gf_slug';
// let setScale = 1;
// let setZipName = 'images';
// let getScaleID = 'gf_scale';
// let getZipNameID = 'gf_zip_name';
// let imgLabelDate = true;
// let imgLabelScale = true;
// let zipLabelDate = true;
// let zipLabelScale = true;
// let debugSVG = true;
// let debugAllowTaint = true;
// let debugUseCORS = true;
// let tempFilesID = 'gf_temp_files';


/*         gfFlow main function         */

function gennyFlow(gf) {
    // captureContainerID = 'gf_container',
    // captureClass = 'gf_capture',
    // slugClass = 'gf_slug',
    // setScale = 1,
    // setZipName = 'images',
    // getScaleID = 'gf_scale',
    // getZipNameID = 'gf_zip_name',
    // imgLabelDate = true,
    // imgLabelScale = true,
    // zipLabelDate = true,
    // zipLabelScale = true,
    // debugSVG = true,
    // debugAllowTaint = true,
    // debugUseCORS = true,
    // tempFilesID = 'gf_temp_files'
    // ) {
    gf = gf || {};
    let captureContainerID = gf.container || 'gf_container';
    let captureClass = gf.cature || 'gf_capture';
    let slugClass = gf.slug || 'gf_slug';
    let setScale = gf.setScale || 1;
    let setZipName = 'images';
    let getScaleID = gf.getScale || 'gf_scale';
    let getZipNameID = 'gf_zip_name';
    let imgLabelDate = true;
    let imgLabelScale = true;
    let zipLabelDate = true;
    let zipLabelScale = true;
    let debugSVG = gf.debugSVG || true;
    let debugAllowTaint = true;
    let debugUseCORS = true;
    let tempFilesID = 'gf_temp_files';
    console.log(setScale);



    /*       Set SVG Height/Width bug fix pt 2       */
    if (debugSVG) {
        var svgElements = document.body.querySelectorAll('svg');
        svgElements.forEach(function (item) {
            item.setAttribute("width", item.getBoundingClientRect().width);
            item.setAttribute("height", item.getBoundingClientRect().height);
        });
        console.log('SVGs fixed');
    }
    const gfDate = gfGetDate;

    const gfScale = getScaleID ? "_@" + document.getElementById(getScaleID).value + 'x' : "_@" + setScale + 'x';
    console.log('gfScale = ' + gfScale);

    const gfFileLabel = gfDate + gfScale;
    console.log('gfFileLabel = ' + gfFileLabel);

    const gfZipLabel = gfDate + gfScale;
    console.log('gfZipLabel = ' + gfZipLabel);

}