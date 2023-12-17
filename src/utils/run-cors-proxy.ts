export async function runCorsProxy(options) {
  console.groupCollapsed("CORS Proxy");

  try {
    const proxyBaseURL = options.corsProxyBaseURL;
    if (!isValidUrl(proxyBaseURL)) {
      console.log("proxy url invalid");
      return;
    }
    const css = document.querySelectorAll('link[rel="stylesheet"]');
    const imgs = document.querySelectorAll("img");
    const length = css.length + imgs.length;

    console.log(`Proxying ${length} assets`);

    for (let stylesheet of css) {
      let stylesheetURL = stylesheet.getAttribute("href");
      // Check if the URL is valid and not a base64 encoded string
      if (
        stylesheetURL &&
        !stylesheetURL.startsWith("data:") &&
        isValidUrl(stylesheetURL)
      ) {
        console.log(`Proxying ${stylesheetURL}`);
        const url = proxyBaseURL + encodeURIComponent(stylesheetURL);
        stylesheet.setAttribute("href", url);
      }
    }

    for (let img of imgs) {
      let imgURL = img.getAttribute("src");
      // Check if the URL is valid and not a base64 encoded string
      if (imgURL && !imgURL.startsWith("data:") && isValidUrl(imgURL)) {
        console.log(`Proxying ${imgURL}`);
        const url = proxyBaseURL + encodeURIComponent(imgURL);
        img.setAttribute("src", url);
      }
    }
  } catch (error) {
    console.error("Error setting attributes:", error);
  }

  console.groupEnd();
}

// Helper function to check if a URL is valid
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
