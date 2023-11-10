import { loginAPI } from "../ultils/apiURL";
import http from "../ultils/httpConfig";

const authService = {
  login: (body) => {
    return http.post(loginAPI, body);
  },
};

export default authService;
