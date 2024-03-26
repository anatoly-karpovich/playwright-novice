import allure from "./allure.js";

const reporterServices = {
  allure: allure,
};

export default reporterServices[process.env.FRAMEWORK || "allure"];
