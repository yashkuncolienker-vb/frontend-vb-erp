import axios from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.REACT_APP_API_BASE_URL;

let headers = {};

const token = `${Cookies.get("Token")}`;

if (token) {
  headers.Authorization = `Bearer ${token}`;
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers,
});

axiosInstance.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    if (error.response.status === 401) {
      window.location = "/login";
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
);

export default axiosInstance;
