import { convertToSlug } from "./convert-to-slug";
import { getDateMMDDYY } from "./get-date-MMDDYY";

/**
 * Generates a zip file label based on user settings.
 *
 * This function creates a label for a zip file using various parameters from the user settings.
 * It includes optional elements such as a date stamp and scale factor in the filename, depending on the user's preferences.
 *
 * @param {Object} userSettings - The settings provided by the user.
 *   It is expected to have the following properties:
 *   - includeScaleZip: {boolean} - Determines if scale factor should be included in the label.
 *   - fileScale: {number} - The scale factor to be used if includeScaleZip is true.
 *   - includeDateZip: {boolean} - Determines if the current date should be included in the label.
 *   - zipName: {string} - The base name of the zip file.
 * @returns {string|null} The formatted zip file label, or null if userSettings is not provided.
 *
 */

export function parseZipLabel(userSettings) {
  if (!userSettings) return null;
  const date = getDateMMDDYY();
  const zipScale = userSettings.includeScaleZip
    ? `_@${userSettings.fileScale}x`
    : "";
  const zipDate = userSettings.includeDateZip ? `_${date}` : "";
  const zipNameSlug = convertToSlug(userSettings.zipName);
  const zipLabel = `${zipNameSlug}${zipScale}${zipDate}.zip`;
  return zipLabel;
}
