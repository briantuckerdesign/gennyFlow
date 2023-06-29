import { gennyFlowListener, initLoader, inlineSVGs, updateLoader, fetchWrapperSettings } from "./utils";
import { defaultSettings } from "./settings";
import { capture } from "./capture";
const { version } = require("../package.json");

// exports gennyFlow to the window object so that it can be called by other scripts
window.gennyFlow = gennyFlow;

// attributes that gennyFlow will look for
// by default uses custom attributes for webflow usage, but can be changed to use classes
let wrapperAttribute = '[gf="wrapper"]';
let captureAttribute = '[gf="capture"]';
let triggerAttribute = '[gf="trigger"]';

// listens for the trigger and then runs gennyFlow
gennyFlowListener(wrapperAttribute, captureAttribute, triggerAttribute);

async function gennyFlow(wrapperSelector, captureSelector) {
    if (!document.querySelector(wrapperSelector)) {
        console.log(`gennyFlow Error: No wrapper found. Add a wrapper using custom attribute: ${wrapperSelector}`);
        return;
    }
    if (!document.querySelector(captureSelector)) {
        console.log(`gennyFlow Error: No capture items found. Add a capture element inside the wrapper using custom attribute: ${captureSelector}`);
        return;
    }

    const listOfCaptureElements = Array.from(document.querySelectorAll(`${wrapperSelector} ${captureSelector}`));

    let loaderStatus = initLoader();
    updateLoader(`Capturing ${listOfCaptureElements.length} items...`, loaderStatus);

    console.log(`
    gennyFlow ${version}
    Running on ${listOfCaptureElements.length} items.  
    `);

    // ORDER OF PRECEDENCE
    // 1. Value from a gf="capture" element
    // 2. User input e.g. gf="scale-input" used on an html input
    // 3. Value from the gf="wrapper" element (this logic happens later in the code)
    // 4. Default value above

    const settings = {};

    Object.keys(defaultSettings).forEach((settingKey) => {
        const setting = defaultSettings[settingKey];
        let variableName = setting.variableName;
        let userValue = null;
        if (document.querySelector(`[gf="${setting.attribute}-input"]`)) {
            userValue = document.querySelector(`[gf="${setting.attribute}-input"]`).value;
        }
        let wrapperValue = null;
        if (document.querySelector(`[gf="wrapper"]`).getAttribute(`gf-${setting.attribute}`)) {
            wrapperValue = document.querySelector(`[gf="wrapper"]`).getAttribute(`gf-${setting.attribute}`);
        }
        let variableValue = userValue || wrapperValue || setting.default;
        settings[variableName] = variableValue;
    });

    // inlines SVGs
    if (!settings.disableSVGfix) {
        updateLoader(`Making it pop...`, loaderStatus);
        await inlineSVGs();
    }

    // ignores elements with gf="ignore"
    const ignoreElements = document.querySelectorAll('[gf="ignore"]');
    ignoreElements.forEach((element) => {
        element.setAttribute("data-html2canvas-ignore", "true");
    });

    // runs html2canvas on each element and downloads
    capture(listOfCaptureElements, defaultSettings, settings, loaderStatus);
}
