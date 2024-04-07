export const apiConfig = {
  baseURL: "https://aqa-course-project.app/",
  endpoints: {
    ["Login"]: `/api/login/`,
    ["Products"]: `/api/products/`,
    ["Product By Id"]: (id: string) => `/api/products/${id}/`,
    ["Customers"]: `/api/customers/`,
    ["Customer By Id"]: (id: string) => `/api/customers/${id}/`,
    ["Orders"]: `/api/orders/`,
    ["Order By Id"]: (id: string) => `/api/orders/${id}/`,
    ["Order Status"]: `/api/orders/status/`,
    ["Order Delivery"]: `/api/orders/delivery/`,
    ["Order Receive"]: `/api/orders/receive/`,
    ["Order Comments"]: `/api/orders/comments/`,
  },
};
