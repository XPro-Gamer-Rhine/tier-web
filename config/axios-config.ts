import axios from "axios";

type Environment = "server" | "local";

const ENV_CONFIG = {
  local: {
    baseURL: "http://localhost:5000/api/v1",
  },
  server: {
    baseURL: "https://qatieroneai.com/api/v1",
  },
} as const;

const currentEnv: Environment = "local";

const getBaseUrl = () => ENV_CONFIG[currentEnv].baseURL;

const changeURLToLogin = (currentLocation: Location) => {
  return `/login?redirect=${encodeURIComponent(currentLocation.pathname)}`;
};

const baseApi = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: function () {
    return true;
  },
});

baseApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

baseApi.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300) {
      if (response.data.error) {
        return Promise.reject(new Error(response.data.error));
      }
      return response;
    }

    const userInLoginPage = window.location.pathname.includes("/login");
    if (response.status === 401 && !userInLoginPage) {
      console.error("401 error occurred");
      window.location.href = changeURLToLogin(window.location);
      return Promise.reject(new Error("Unauthorized"));
    }

    return Promise.reject({
      status: response.status,
      message: response.data.message || "An error occurred",
      data: response.data,
    });
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status >= 400 && status < 500) {
        console.error("Client error:", error.response.data.message);
      } else if (status >= 500) {
        console.error("Server error:", error.response.data.message);
      }
    } else if (error.request) {
      console.error("Network error or no response received.");
    } else {
      console.error("Error in request setup:", error.message);
    }
    return Promise.reject(error);
  }
);

export default baseApi;
