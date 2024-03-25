import { Locator } from "@playwright/test";

export interface IWaitUntilOptions {
  timeout?: number;
  timeoutMsg?: string;
  interval?: number;
}

export type ResizeCoordinates = {
  xOffset: number;
  yOffset: number;
};

export type ElementState = "attached" | "detached" | "visible" | "hidden";
