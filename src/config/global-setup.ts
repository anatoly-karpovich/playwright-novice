import reporter from "../utils/reporter/reporters/reporter.js";

async function globalSetup() {
  reporter.clearReportResults();
}

export default globalSetup;
