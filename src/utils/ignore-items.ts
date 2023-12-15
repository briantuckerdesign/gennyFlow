// Find elements with the specified attributes and add the class to them
export async function prepareIgnoredNodes() {
  document
    .querySelectorAll('[gf="ignore"], [data-html2canvas-ignore="true"]')
    .forEach((element) => {
      element.classList.add("gf_ignore-item");
    });
}
export const nodesToIgnore = (node: HTMLElement) => {
  const exclusionClasses = ["gf_ignore-item"];
  return !exclusionClasses.some((classname) =>
    node.classList?.contains(classname)
  );
};
