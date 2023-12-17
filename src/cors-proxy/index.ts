import { isValidUrl } from "../utils";
import { proxyCSS } from "./proxy-css";
import { proxyImages } from "./proxy-images";

/**
 * runCorsProxy - Initializes a CORS proxy by processing image and CSS resources on a web page.
 * Logs the total number of calls made to the proxy server.
 *
 * @param {Object} options - Configuration settings for the CORS proxy.
 *   Expected properties:
 *     - corsProxyBaseURL: String - The base URL of the CORS proxy server.
 * @returns {void}
 */
export async function runCorsProxy(options) {
  const proxyBaseURL = options.corsProxyBaseURL;
  if (!isValidUrl(proxyBaseURL)) {
    return;
  }

  console.groupCollapsed("CORS Proxy");

  let proxyPings = await proxyImages(options);
  proxyPings = await proxyCSS(options, proxyPings);

  console.log(`
    Total calls made to proxy server: ${proxyPings}`);
  console.groupEnd();
}
