export function optionSafetyCheck(key, value): any {
  // Handle number inputs
  if (key === "scale" || key === "quality") {
    if (typeof value === "number") return value;
    value = value.trim();
    value = parseFloat(value);
    if (isNaN(value)) return null;
    return value;
  }
  // Handle boolean inputs
  if (key === "dateInLabel" || key === "scaleInLabel") {
    if (typeof value === "boolean") return value;
    value = value.trim();
    return value === "true";
  }
  // handle image format
  if (key === "format") {
    value = value.trim();
    if (value === "jpg" || value === "png") return value;
    return null;
  }
  return null;
}
