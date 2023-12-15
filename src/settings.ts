/**
 * `defaultSettings` holds the default configuration options for the gennyFlow function.
 * Each setting is an object with an attribute name, the variable name to be used in the code,
 * the default value, and the type of the setting.
 */

export const defaultSettings = {
  format: {
    attribute: "format", // The data attribute name for format settings
    variableName: "fileFormat", // The variable name to be used in code
    default: "png", // The default value
    type: "string", // The type of the setting value
  },
  quality: {
    attribute: "quality",
    variableName: "fileQuality",
    default: 1,
    type: "number",
  },
  scale: {
    attribute: "scale",
    variableName: "fileScale",
    default: 1,
    type: "number",
  },
  zipName: {
    attribute: "zip-name",
    variableName: "zipName",
    default: "images",
    type: "string",
  },
  disableSVGfix: {
    attribute: "disable-svg-fix",
    variableName: "disableSVGfix",
    default: false,
    type: "boolean",
  },
  includeDateZip: {
    attribute: "include-date-zip",
    variableName: "includeDateZip",
    default: true,
    type: "boolean",
  },

  includeScaleZip: {
    attribute: "include-scale-zip",
    variableName: "includeScaleZip",
    default: true,
    type: "boolean",
  },
  includeDateImg: {
    attribute: "include-date-img",
    variableName: "includeDateImg",
    default: false,
    type: "boolean",
  },
  includeScaleImg: {
    attribute: "include-scale-img",
    variableName: "includeScaleImg",
    default: false,
    type: "boolean",
  },
};

/**
 * `wrapperAttribute` is the CSS selector for the HTML container that encloses all elements to be captured.
 */
export let wrapperAttribute = '[gf="wrapper"]';

/**
 * `captureAttribute` is the CSS selector for individual HTML elements that are targeted for download/capture.
 */
export let captureAttribute = '[gf="capture"]';

/**
 * `triggerAttribute` is the CSS selector for the HTML element that, when clicked, will initiate the gennyFlow process.
 */
export let triggerAttribute = '[gf="trigger"]';
