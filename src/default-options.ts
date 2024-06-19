import * as types from "./types";

export const defaultOptions: types.Options = {
  image: {
    format: "png",
    quality: 1,
    scale: 1,
    dateInLabel: true,
    scaleInLabel: true,
  },
  zip: {
    label: "images",
    dateInLabel: true,
    scaleInLabel: true,
  },
  attributes: {
    wrapperSelector: `[ie="wrapper"]`,
    captureSelector: '[ie="capture"]',
    triggerSelector: '[ie="trigger"]',
    slugSelector: '[ie="slug"]',
    ignoreSelector: '[ie="ignore"]',
    scale: "ie-scale",
    quality: "ie-quality",
    format: "ie-format",
    zipLabel: "ie-zip-label",
    zipLabelDate: "ie-zip-label-date",
    zipLabelScale: "ie-zip-label-scale",
    imgLabelDate: "ie-img-label-date",
    imgLabelScale: "ie-img-label-scale",
    corsProxyBaseUrl: "ie-cors-proxy-base-url",
  },
  corsProxyBaseUrl: "",
  downloadImages: true,
  inputPrefix: "ie",
};
