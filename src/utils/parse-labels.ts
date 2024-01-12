import { convertToSlug } from "./convert-to-slug";
import { getDateMMDDYY } from "./get-date-MMDDYY";

/**
 * Generates a zip file label based on user settings.
 *
 * This function creates a label for a zip file using various parameters from the user settings.
 * It includes optional elements such as a date stamp and scale factor in the filename, depending on the user's preferences.
 *
 * @param {Object} options - The settings provided by the user.
 *   It is expected to have the following properties:
 *   - includeScaleZip: {boolean} - Determines if scale factor should be included in the label.
 *   - fileScale: {number} - The scale factor to be used if includeScaleZip is true.
 *   - includeDateZip: {boolean} - Determines if the current date should be included in the label.
 *   - zipName: {string} - The base name of the zip file.
 * @returns {string|null} The formatted zip file label, or null if userSettings is not provided.
 *
 */

export function parseZipLabel(options) {
  if (!options) return null;
  const date = getDateMMDDYY();
  const zipScale = convertStringToBoolean(options.includeScaleZip)
    ? `_@${options.scale}x`
    : "";
  const zipDate = convertStringToBoolean(options.includeDateZip)
    ? `_${date}`
    : "";
  const zipNameSlug = convertToSlug(options.zipName);
  const zipLabel = `${zipNameSlug}${zipDate}${zipScale}.zip`;
  return zipLabel;
}

export function parseImageLabel(options) {
  if (!options) return null;
  const date = getDateMMDDYY();
  const imgScale = convertStringToBoolean(options.includeScaleImg)
    ? `_@${options.scale}x`
    : "";
  const imgDate = convertStringToBoolean(options.includeDateImg)
    ? `_${date}`
    : "";
  const imgNameSlug = convertToSlug(options.userSlug) || `img-${options.id}`;
  const imgLabel = `${imgNameSlug}${imgDate}${imgScale}`;
  return imgLabel;
}

function convertStringToBoolean(str) {
  // Convert "true" or "false" to boolean
  if (str === "true") {
    return true;
  } else if (str === "false") {
    return false;
  }

  // Return the original string if no conversion is possible
  return str;
}
