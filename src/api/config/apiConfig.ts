export const apiConfig = {
  baseURL: "https://aqa-course-project.app/",
  endpoints: {
    ["Login"]: `/api/login/`,
    ["Products"]: `/api/products/`,
    ["Product By Id"]: (id: string) => `/api/products/${id}/`,
  },
};
