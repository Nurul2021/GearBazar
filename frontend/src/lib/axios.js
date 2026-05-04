/**
 * Secure Axios Instance
 * Configured with interceptors for JWT auth, error handling, and timeouts
 * Follows OWASP security best practices for API communication
 *
 * Uses NEXT_PUBLIC_API_URL from environment variables
 */

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { API_URL, isDemo } from "./config";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const injectToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    let token = null;

    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");

      if (!token) {
        const cookieToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];
        token = cookieToken || null;
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.metadata = { startTime: new Date() };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.config?.metadata?.startTime) {
      const duration = new Date() - response.config.metadata.startTime;
      console.log(
        `[API] ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status} (${duration}ms)`,
      );
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const responseData = error.response?.data;

    if (error.code === "ECONN_ABORTED") {
      toast.error("Request timeout. Please check your connection.", {
        duration: 5000,
      });
      return Promise.reject(error);
    }

    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken =
          typeof window !== "undefined"
            ? localStorage.getItem("refreshToken")
            : null;

        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        const response = await axios.post(`${API_URL}/auth/refresh-token`, {
          refreshToken,
        });

        const { token } = response.data.data;

        if (typeof window !== "undefined") {
          localStorage.setItem("token", token);
        }

        injectToken(token);
        processQueue(null, token);

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");

          window.dispatchEvent(new Event("logout"));

          // AUTH DISABLED - No redirect
          // if (window.location.pathname !== "/login") {
          //   window.location.href = "/login?session=expired";
          // }
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    const errorMessages = {
      400: "Invalid request. Please check your input.",
      403: "You do not have permission to perform this action.",
      404: "The requested resource was not found.",
      422: "Validation failed. Please check your data.",
      429: "Too many requests. Please wait a moment.",
      500: "Server error. Please try again later.",
      502: "Service unavailable. Please try again.",
      503: "Service temporarily unavailable.",
    };

    const message =
      responseData?.message ||
      responseData?.error ||
      errorMessages[status] ||
      "An unexpected error occurred";

    if (status === 401) {
      toast.error(message, { duration: 4000 });
    } else if (status >= 400) {
      toast.error(message, { duration: 4000 });
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;

export const api = {
  get: (url, config = {}) => axiosInstance.get(url, config),
  post: (url, data = {}, config = {}) => axiosInstance.post(url, data, config),
  put: (url, data = {}, config = {}) => axiosInstance.put(url, data, config),
  patch: (url, data = {}, config = {}) =>
    axiosInstance.patch(url, data, config),
  delete: (url, config = {}) => axiosInstance.delete(url, config),
  head: (url, config = {}) => axiosInstance.head(url, config),
  options: (url, config = {}) => axiosInstance.options(url, config),
};

export const createApiInstance = (options = {}) => {
  return axios.create({
    baseURL: options.baseURL || API_URL,
    timeout: options.timeout || 30000,
    ...options,
  });
};
