// Function to get user input value
export const getUserValue = (attribute: string): string | null => {
  const inputElement = document.querySelector(
    `[gf="${attribute}-input"]`
  ) as HTMLInputElement | null;
  return inputElement ? inputElement.value : null;
};

// Function to get wrapper value
export const getWrapperValue = (
  attribute: string,
  wrapperSelector: string
): string | null => {
  const wrapperElement = document.querySelector(wrapperSelector);
  return wrapperElement ? wrapperElement.getAttribute(`gf-${attribute}`) : null;
};
