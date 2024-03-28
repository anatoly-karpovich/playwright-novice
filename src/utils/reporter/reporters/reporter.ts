import allure from "utils/reporter/reporters/allure";
import { BaseReporter } from "utils/reporter/reporters/baseReporter";

const reporterServices: Record<string, BaseReporter> = {
  allure,
};

export default reporterServices[process.env.REPORTER || "allure"];
