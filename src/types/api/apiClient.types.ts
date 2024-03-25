export type IRequestOptions<Data = object> = {
  url: string;
  options: {
    method: Method;
    params?: { [key: string]: string | number | boolean };
    headers: Record<string, string>;
    data?: Data;
    timeout?: number;
  };
  requestType: "json" | "formData";
};

type Method = "post" | "get" | "put" | "patch" | "delete";

export interface IResponse<T = any> {
  data: T;
  status: number;
  headers: Record<string, unknown>;
}

export interface RequestParams<T> {
  data: T;
  token?: string;
}

export type Id = {
  _id: string;
};

export interface IPostRequestParams<T> {
  data: T;
  token?: string;
}
