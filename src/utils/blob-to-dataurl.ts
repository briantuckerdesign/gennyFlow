/**
 * blobToDataURL - Converts a Blob object to a data URL.
 *
 * @param {Blob} blob - The Blob object to be converted.
 * @returns {Promise<string>} - Returns a Promise that resolves to a data URL string.
 */
export function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
