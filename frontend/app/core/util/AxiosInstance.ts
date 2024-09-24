import axios from "axios";


export const axiosInstance = axios.create({
    headers: {
      Accept: 'application/json',
    },
  });
