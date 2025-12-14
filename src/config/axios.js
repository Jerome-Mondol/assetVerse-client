import axios from 'axios'

const baseURL = "https://assetverse-server-xpr1.onrender.com"

export const axiosInstance = axios.create({
  baseURL,
   headers: {
        "Content-Type": "application/json",
    },
});

export const secureAxios = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

secureAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// https://assetverse-server-xpr1.onrender.com