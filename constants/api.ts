import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { API_URL } from "./strings";

const config: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
  baseURL: API_URL,
};

export const axiosInstance: AxiosInstance = axios.create(config);
