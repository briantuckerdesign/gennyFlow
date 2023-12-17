// Function to get user input value
export const getUserValue = (attribute: string): string | null => {
  // removes gf- prefix from attributes
  attribute = attribute.slice(3);
  const selector = `[gf="${attribute}-input"]`;
  const inputElement = document.querySelector(
    selector
  ) as HTMLInputElement | null;
  if (inputElement) {
    return inputElement.value;
  } else return null;
};

// Function to get wrapper value
export const getWrapperValue = (
  attribute: string,
  wrapperSelector: string
): string | null => {
  const wrapperElement = document.querySelector(wrapperSelector);
  return wrapperElement ? wrapperElement.getAttribute(`gf-${attribute}`) : null;
};

// Function to get item value
export const getItemValue = (attribute, element): string | null => {
  const itemValue = element.querySelector(`gf-${attribute}`);
  if (itemValue) {
    return itemValue;
  } else {
    return null;
  }
};
