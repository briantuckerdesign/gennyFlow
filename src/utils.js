import inlineSVG from "inline-svg";

export function convertToSlug(input) {
    input = input.toLowerCase();
    input = input.replace(/[^a-z0-9_@ -]/g, "");
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

export function initLoader() {
    const gfLoader = document.querySelector(".gf_loader");
    if (gfLoader) {
        gfLoader.style.opacity = "0";
        gfLoader.style.display = "block";
        gfLoader.style.opacity = "1";
    }
    const gfLoaderMessage = document.querySelector(".gf_loader-message");
    if (gfLoaderMessage && gfLoader) {
        return true;
    } else {
        return false;
    }
}

export function updateLoader(message, loaderStatus) {
    if (loaderStatus) {
        const gfLoaderMessage = document.querySelector(".gf_loader-message");
        gfLoaderMessage.innerHTML = message;
    }
}

export function closeLoader() {
    const gfLoader = document.querySelector(".gf_loader");
    if (gfLoader) {
        gfLoader.style.opacity = "0";
        //delay by 200ms
        setTimeout(() => {
            gfLoader.style.display = "none";
        }, 200);
    }
}

export async function gennyFlowListener(wrapperSelector = '[gf="wrapper"]', captureSelector = '[gf="capture"]', triggerSelector = '[gf="trigger"]') {
    const trigger = document.querySelector(triggerSelector);
    if (trigger) {
        trigger.addEventListener("click", function () {
            gennyFlow(wrapperSelector, captureSelector);
        });
    } else console.log('gennyFlow Warning: No trigger found.  Add a trigger with custom attribute gf="trigger". Ignore this warning if you are running gennyFlow manually.');
}
