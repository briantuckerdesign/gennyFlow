import { isValidUrl } from "../utils";
import { Options } from "../options-interface";

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

export async function proxyCSS(options: Partial<Options>): Promise<number> {
  let cssPings = 0;
  let proxyPings = 0;
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

      try {
        // Fetch the CSS content
        const response = await fetch(url);
        const cssText = await response.text();

        // Create a <style> element and set its content
        const styleEl = document.createElement("style");
        styleEl.textContent = cssText;

        // Append the <style> element to the document's <head>
        document.head.appendChild(styleEl);

        // Remove the original <link> element
        stylesheet.remove();

        proxyPings++;
        cssPings++;
      } catch (error) {
        console.error("Error fetching CSS:", error);
      }
    }
  }

  console.log(`Stylesheets proxied: ${cssPings}`);
  return proxyPings;
}
