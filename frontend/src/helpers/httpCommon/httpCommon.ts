import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? "http://localhost:8888/api/v1",
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? `JWT ${localStorage.getItem("access_token")}`
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default apiClient;
