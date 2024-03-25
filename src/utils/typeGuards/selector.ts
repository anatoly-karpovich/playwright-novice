import { Locator } from "@playwright/test";

export function isLocator(selectorOrLocator: string | Locator): selectorOrLocator is Locator {
  return typeof selectorOrLocator !== "string";
}

export function isLocatorArray(selectorOrLocator: string | Locator[]): selectorOrLocator is Locator[] {
  return Array.isArray(selectorOrLocator) && selectorOrLocator.every((el) => typeof el !== "string");
}
