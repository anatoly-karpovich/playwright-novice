import reporter from "utils/reporter/reporters/reporter";

async function globalSetup() {
  reporter.clearReportResults();
}

export default globalSetup;
