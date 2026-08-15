import axios from "axios";

const api = axios.create({
  baseURL: "https://logistics-platform-api-9qy0.onrender.com",
});

export default api;