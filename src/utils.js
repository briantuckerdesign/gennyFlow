/**
 * Converts a given string to a URL-friendly slug.
 *
 * @param {string} input - The string to be converted to a slug.
 * @returns {string} The input string transformed into a slug format.
 */
export function convertToSlug(input) {
    input = input.toLowerCase();
    input = input.replace(/[^a-z0-9_@ -]/g, "");
    input = input.replace(/\s+/g, "-");
    return input;
}

/**
 * Determines if a given element is currently visible on the page.
 *
 * @param {Element} element - The DOM element to check for visibility.
 * @returns {boolean} True if the element is visible, false otherwise.
 */
export function isVisible(element) {
    if (element.offsetParent === null) return false;
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
}

/**
 * Initializes a loading indicator element on the page, if it exists.
 *
 * @returns {boolean} True if the loader element is found and initialized, false otherwise.
 */
export function initLoader() {
    const gfLoader = document.querySelector(".gf_loader");
    if (gfLoader) {
        gfLoader.style.opacity = "0";
        gfLoader.style.display = "block";
        gfLoader.style.opacity = "1";
    }
    const gfLoaderMessage = document.querySelector(".gf_loader-message");
    return !!(gfLoaderMessage && gfLoader);
}

/**
 * Updates the message of an existing loading indicator on the page.
 *
 * @param {string} message - The message to display in the loading indicator.
 * @param {boolean} loaderStatus - The status of the loader, if it is initialized and displayed.
 */
export function updateLoader(message, loaderStatus) {
    if (loaderStatus) {
        const gfLoaderMessage = document.querySelector(".gf_loader-message");
        gfLoaderMessage.innerHTML = message;
    }
}

/**
 * Closes and hides the loading indicator element on the page.
 */
export function closeLoader() {
    const gfLoader = document.querySelector(".gf_loader");
    if (gfLoader) {
        gfLoader.style.opacity = "0";
        // Delay the hiding of the loader to allow for fade-out transition.
        setTimeout(() => {
            gfLoader.style.display = "none";
        }, 200);
    }
}
