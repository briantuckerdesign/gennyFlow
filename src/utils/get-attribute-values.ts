import { Options } from "../options-interface";

// Function to get user input value
export const getUserValue = (options: Options, attribute: string): string | null => {
  // removes gf- prefix from attributes
  attribute = attribute.slice(3);
  const selector = `[${options.prefix}="${attribute}-input"]`;
  const inputElement = document.querySelector(selector) as HTMLInputElement | null;
  console.log("📣 - getUserValue - selector:", selector);
  if (inputElement) {
    console.log("📣 - getUserValue - inputElement.value:", inputElement.value);
    return inputElement.value;
  } else return null;
};

// Function to get wrapper value
export const getWrapperValue = (
  options: Options,
  attribute: string,
  wrapperSelector: string
): string | null => {
  const wrapperElement = document.querySelector(wrapperSelector);
  return wrapperElement
    ? wrapperElement.getAttribute(`${options.prefix}-${attribute}`)
    : null;
};

// Function to get item value
export const getItemValue = (options: Options, attribute, element): string | null => {
  const itemValue = element.querySelector(`${options.prefix}-${attribute}`);
  if (itemValue) {
    return itemValue;
  } else {
    return null;
  }
};
