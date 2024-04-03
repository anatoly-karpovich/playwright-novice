const localUrl = `http://127.0.0.1:5502/index.html`;
const prodUrl = `https://anatoly-karpovich.github.io/aqa-course-project/`;

export const URL = process.env.ENV === "prod" ? prodUrl : localUrl;
export const ADMIN_USERNAME = `${process.env.ADMIN_EMAIL}`;
export const ADMIN_PASSWORD = `${process.env.ADMIN_PASSWORD}`;
export const TESTS = `${process.env.TESTS}`;
