
import axios from "axios";
import { useUserStore } from "./stores/userStore";

//import { useUserStore } from "./stores/userStore"

const axiosClient = axios.create({
  withCredentials: true,
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  headers:{
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

axiosClient.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${useUserStore().$state.user.token}`
  return config;
})

export default axiosClient;
