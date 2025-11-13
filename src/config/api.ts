import axios from "axios";


export const api = axios.create({
  baseURL: "http://localhost:8081/api/v1",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});