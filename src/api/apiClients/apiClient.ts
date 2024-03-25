import requestApiClient from "./requestApiClient";

const clients = {
  request: requestApiClient,
};

export default clients[process.env.API_CLIENT || "request"];
