import axios from "axios";


export const api = axios.create({
  baseURL: "https://ecommerceapp-ii5l.onrender.com/api/v1",
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
});
