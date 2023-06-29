export const flowSettings = {
    format: {
        attribute: "format",
        variableName: "fileFormat",
        default: "png",
        type: "string",
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
