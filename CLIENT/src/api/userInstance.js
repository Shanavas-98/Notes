import axios from "axios";

const userInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL + "/api",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

userInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

userInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.data.name === "TokenExpiredError") {
      // JWT token is expired, perform user logout
      localStorage.removeItem("userToken");
      // Redirect to the login page
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

export default userInstance;