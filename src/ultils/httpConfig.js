import axios from "axios";
import { BASE_URL } from "./apiURL";
import { LOCAL_ITEM } from "./constant";

class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
    });
  }
}

const http = new Http().instance;

http.interceptors.request.use((config) => {
  const token = localStorage.getItem(LOCAL_ITEM.ACCESS_TOKEN)
    ? localStorage.getItem(LOCAL_ITEM.ACCESS_TOKEN)
    : sessionStorage.getItem(LOCAL_ITEM.ACCESS_TOKEN);
  console.log(token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use((response) => {
  return response;
});

export default http;
