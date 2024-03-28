import allure from "./allure.js";
import { BaseReporter } from "./baseReporter.js";

const reporterServices: Record<string, BaseReporter> = {
  allure,
};

export default reporterServices[process.env.REPORTER || "allure"];
