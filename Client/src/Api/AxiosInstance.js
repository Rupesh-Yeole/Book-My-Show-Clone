import axios from 'axios';

export const axiosInstance = axios.create({
    headers:{
        'Content-Type':"application/json"
    }
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["accessToken"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);