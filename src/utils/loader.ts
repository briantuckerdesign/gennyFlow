/**
 * Initializes a loading indicator element on the page, if it exists.
 *
 * @returns {boolean} True if the loader element is found and initialized, false otherwise.
 */
export function initLoader(): boolean {
  const gfLoader = document.querySelector(".gf_loader") as HTMLElement | null;

  const gfLoaderMessage = document.querySelector(
    ".gf_loader-message"
  ) as HTMLElement | null;

  if (gfLoader && gfLoaderMessage) {
    gfLoader.style.opacity = "0";
    gfLoader.style.display = "block";
    gfLoader.style.opacity = "1";

    updateLoadingMessage("Loading...", true);
    return true;
  }

  return false;
}

/**
 * Updates the message of an existing loading indicator on the page.
 *
 * @param {string} message - The message to display in the loading indicator.
 * @param {boolean} loaderStatus - The status of the loader, if it is initialized and displayed.
 */
export function updateLoadingMessage(
  message: string,
  loaderStatus: boolean = false
) {
  if (loaderStatus) {
    const gfLoaderMessage = document.querySelector(
      ".gf_loader-message"
    ) as HTMLElement | null;
    if (gfLoaderMessage) {
      gfLoaderMessage.innerHTML = message;
    }
  }
}

/**
 * Closes and hides the loading indicator element on the page.
 */
export function closeLoader(): void {
  const gfLoader = document.querySelector(".gf_loader") as HTMLElement | null;
  if (gfLoader) {
    gfLoader.style.opacity = "0";
    // Delay the hiding of the loader to allow for fade-out transition.
    setTimeout(() => {
      gfLoader.style.display = "none";
    }, 200);
  }
}
