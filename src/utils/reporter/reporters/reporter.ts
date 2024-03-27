import allure from "./allure.js";
import { BaseReporter } from "./baseReporter.js";

const reporterServices = {
  allure: allure,
};

export default reporterServices[process.env.FRAMEWORK || "allure"] as BaseReporter;
