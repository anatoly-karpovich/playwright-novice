import { BaseApiClient } from "api/apiClients/baseApiClient";
import requestApiClient from "api/apiClients/requestApiClient";

const clients: Record<string, BaseApiClient> = {
  request: requestApiClient,
};

export default clients[process.env.API_CLIENT || "request"];
