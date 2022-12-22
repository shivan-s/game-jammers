import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? "http://localhost:8888/api/v1",
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;
