import { isValidUrl } from "../utils";
import { proxyCSS } from "./proxy-css";
import { proxyImages } from "./proxy-images";
import { Options } from "../types/options";

/**
 * runCorsProxy - Initializes a CORS proxy by processing image and CSS resources on a web page.
 * Logs the total number of calls made to the proxy server.
 *
 * @param {Object} options - Configuration settings for the CORS proxy.
 *   Expected properties:
 *     - corsProxyBaseURL: String - The base URL of the CORS proxy server.
 * @returns {void}
 */

export async function runCorsProxy(options: Options): Promise<void> {
  const proxyBaseURL = options.corsProxyBaseUrl;
  if (!isValidUrl(proxyBaseURL)) {
    return;
  }

  await proxyCSS(options);
  await proxyImages(options);

  return;
}
