import axios from "axios";
import { getData } from "../common/utils/Storage";

const instance = axios.create({
  baseURL: 'https://student-api.acpt.lk/api',
});

instance.interceptors.request.use(
  async (config) => {
    const userData = await getData();
    
    if (userData) {
      const { token, email } = userData; 

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (email) {
        config.headers['X-User-Email'] = email; 
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
