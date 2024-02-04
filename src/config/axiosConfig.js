import axios from "axios";


<<<<<<< HEAD
const url = "https://appbenevoleamelines.cluster-ig4.igpolytech.fr/api/" || "http://localhost:4000/api"

=======
//const url = "https://appbenevoleamelines.cluster-ig4.igpolytech.fr/api/" || "http://localhost:4000/api"
const url = "https://appbenevoleamelines.cluster-ig4.igpolytech.fr/api/"
>>>>>>> 8c2445a2120b0d4c77f7272c42388731d91cfc90
//const url = "http://localhost:4000/api/"
const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;