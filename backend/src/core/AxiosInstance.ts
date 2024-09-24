import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: `${process.env.BASE_URL}`,
    headers: {
      Accept: 'application/json',
    },
  });

  // Request Interceptor to append API key
  axiosInstance.interceptors.request.use(
    (config) => {
      if (!config.params) {
        config.params = {};
      }
      config.params['key'] = process.env.WEATHERBIT_API_KEY;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );