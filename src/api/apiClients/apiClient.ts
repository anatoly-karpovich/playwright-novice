import { BaseApiClient } from "./baseApiClient";
import requestApiClient from "./requestApiClient";

const clients: Record<string, BaseApiClient> = {
  request: requestApiClient,
};

export default clients[process.env.API_CLIENT || "request"];
