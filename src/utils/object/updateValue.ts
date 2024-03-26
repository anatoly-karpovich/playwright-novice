import { hideSecretData } from "../string/index.js";

export function updateValueInObject(obj: object, keyToFind: string, newValue: Function) {
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      // If the current property is an object, recursively search inside it
      updateValueInObject(obj[key], keyToFind, newValue);
    } else if (key === keyToFind) {
      // If the key matches, update its value
      typeof newValue === "function" ? (obj[key] = newValue(obj[key])) : (obj[key] = newValue);
    }
  }
}

export function hideValueInObject(obj: object, keyToFind: string) {
  return updateValueInObject(obj, keyToFind, hideSecretData);
}
