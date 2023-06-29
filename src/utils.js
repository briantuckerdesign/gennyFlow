import inlineSVG from "inline-svg";

export function convertToSlug(input) {
    input = input.toLowerCase();
    input = input.replace(/[^a-z0-9_ -]/g, "");
    input = input.replace(/\s+/g, "-");
    return input;
}
export async function inlineSVGs() {
    const imgs = document.querySelectorAll('div[gf=wrapper] img[src$=".svg"]:not([gf=ignore])');

    imgs.forEach((img) => {
        if (isVisible(img)) {
            img.classList.add("gf_img2svg");
        }
    });

    inlineSVG.init({
        svgSelector: "img.gf_img2svg",
        initClass: "js-inlinesvg",
    });

    var svgElements = document.body.querySelectorAll("svg.gf_img2svg");
    svgElements.forEach(function (item) {
        item.setAttribute("width", item.getBoundingClientRect().width);
        item.setAttribute("height", item.getBoundingClientRect().height);
    });
}

export function isVisible(element) {
    if (element.offsetParent === null) return false;
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
}
