import axios from "axios";
import { getData } from "../common/utils/Storage";
const instance = axios.create({
  baseURL: 'https://student-api.acpt.lk/api',
});

instance.interceptors.request.use(
  async (config) => {
    const token = await getData();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
