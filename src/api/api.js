import axios from "axios";

const api = axios.create({
  baseURL: "https://mern-multivendor-server.onrender.com/api",
  withCredentials: true,
});

export default api;
