import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://assetverse-server-xpr1.onrender.com',
   headers: {
        "Content-Type": "application/json",
    },
});

export const secureAxios = axios.create({
  baseURL: "https://assetverse-server-xpr1.onrender.com",
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