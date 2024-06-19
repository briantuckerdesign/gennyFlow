import * as types from "../types";

/**
 * Option determination order:
 * 1. User input
 * 2. Item attribute
 * 3. Wrapper attribute
 * 4. Default
 *
 * Meaning wrapper overwrites default, item overwrites wrapper, and user input overwrites all.
 */

/**
 * Checks if the user provided a value via attribute on an input element.
 * If the user provided a value, it returns the value. Otherwise, it returns null.
 */
export const getUserInputValue = (
  options: types.Options,
  attribute: string
): string | null => {
  // removes prefix from attributes (content before and including the first dash)
  const prefixEndIndex = attribute.indexOf("-") + 1;
  attribute = attribute.slice(prefixEndIndex);

  const selector = `[${options.inputPrefix}-input="${attribute}"]`;

  const inputElement = document.querySelector(selector) as HTMLInputElement | null;

  if (inputElement) {
    return inputElement.value;
  } else return null;
};

/**
 * Checks if the user provided a value via attribute on the wrapper element.
 * If the user provided a value, it returns the value. Otherwise, it returns null.
 */
export const getWrapperValue = (
  options: types.Options,
  attribute: string,
  wrapperSelector: string
): string | null => {
  const wrapperElement = document.querySelector(wrapperSelector);
  return wrapperElement ? wrapperElement.getAttribute(attribute) : null;
};

/**
 * Checks if the user provided a value via attribute on an item element.
 * If the user provided a value, it returns the value. Otherwise, it returns null.
 */
export const getItemValue = (
  options: types.Options,
  attribute,
  element
): string | null => {
  const itemValue = element.querySelector(attribute);
  if (itemValue) {
    return itemValue;
  } else {
    return null;
  }
};
