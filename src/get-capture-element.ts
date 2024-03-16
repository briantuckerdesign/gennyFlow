import { isVisible } from "./utils/is-visible";
import { updateLoadingMessage } from "./utils/loader";

export async function getCaptureElements(options): Promise<Element[]> {
  await updateLoadingMessage(
    "Searching for items to capture...",
    options.loaderEnabled
  );
  if (!document.querySelector(options.captureSelector)) {
    console.error("gennyFlow: No capture items found in the wrapper.");
    return [];
  }
  const elements = Array.from(
    document.querySelectorAll(
      `${options.wrapperSelector} ${options.captureSelector}`
    )
  );
  // Filter out elements that are not visible
  const visibleElements = elements.filter((element) => isVisible(element));

  return visibleElements;
}
