// apiUrl.tsx
import axios from "axios";

export const WEB_URL = 'http://localhost:3000/';

export const AxiosInstance = (contentType = 'application/json') => {
  const axiosInstance = axios.create({
    baseURL: WEB_URL
  });
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = '';
      config.headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': contentType
      } as any
      return config
    }
  );

  axiosInstance.interceptors.response.use(
    res => res.data,
    err => Promise.reject(err)
  );

  return axiosInstance;
}
