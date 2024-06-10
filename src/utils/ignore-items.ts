import { Options } from "../options-interface";

// Find elements with the specified attributes and add the class to them
export function getIgnoredNodes(options: Options) {
  return (
    document.querySelectorAll(
      `[${options.prefix}=ignore], [${options.prefix}-ignore=true], [data-html2canvas-ignore=true]`
    ) || []
  );
}
