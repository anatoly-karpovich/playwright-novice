import { TESTS } from "./environment";

const suites = {
  UI: "../ui/tests",
  API: "../api/tests",
};

let suiteName: keyof typeof suites;

if (TESTS === "UI") suiteName = "UI";
else suiteName = "API";

export default suites[suiteName];
