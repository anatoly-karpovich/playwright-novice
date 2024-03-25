import { AxiosResponseHeaders } from "axios";

export interface IRequestApiInfo<Data = string | object> {
  url: string | undefined;
  method: string | undefined;
  headers: AxiosResponseHeaders | Record<string, string> | undefined;
  data?: Data | undefined;
}

export interface IResponseApiInfo<Data = string | object> extends IRequestApiInfo {
  status: number;
}
