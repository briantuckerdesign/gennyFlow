import { isValidUrl } from "../utils";

/**
 * proxyCSS - Processes CSS stylesheets linked in the document to use the CORS proxy.
 * Each valid and non-data URL stylesheet's href attribute is updated with the proxy URL.
 *
 * @param {Object} options - Configuration settings, including the CORS proxy base URL.
 *   Expected properties:
 *     - corsProxyBaseURL: String - The base URL of the CORS proxy server.
 * @param {number} proxyPings - Initial count of proxy server pings.
 * @returns {Promise<number>} - Returns the updated count of proxy server pings after processing stylesheets.
 */
export async function proxyCSS(options, proxyPings) {
  let cssPings = 0;
  const css = document.querySelectorAll('link[rel="stylesheet"]');
  for (let stylesheet of css) {
    let stylesheetURL = stylesheet.getAttribute("href");
    // Check if the URL is valid and not a base64 encoded string
    if (
      stylesheetURL &&
      !stylesheetURL.startsWith("data:") &&
      isValidUrl(stylesheetURL)
    ) {
      const url = options.corsProxyBaseURL + encodeURIComponent(stylesheetURL);
      stylesheet.setAttribute("href", url);
      proxyPings++;
      cssPings++;
    }
  }
  console.log(`
    Stylesheets proxied: ${cssPings}`);
  return proxyPings;
}
