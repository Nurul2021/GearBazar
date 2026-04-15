/**
 * Error Handler Utility
 * Helper functions for handling API errors consistently
 */

import toast from "react-hot-toast";

export function handleApiError(error, customMessages = {}) {
  const status = error?.response?.status;
  const data = error?.response?.data;

  const defaultMessages = {
    400: "Invalid request. Please check your input.",
    401: "Session expired. Please login again.",
    403: "You do not have permission to perform this action.",
    404: "The requested resource was not found.",
    422: "Validation failed. Please check your data.",
    429: "Too many requests. Please wait a moment.",
    500: "Server error. Please try again later.",
    502: "Service unavailable. Please try again.",
    503: "Service temporarily unavailable.",
  };

  const message =
    customMessages[status] ||
    data?.message ||
    data?.error ||
    defaultMessages[status] ||
    "An unexpected error occurred";

  toast.error(message, { duration: 4000 });

  return { status, message, data };
}

export function handleSuccess(message) {
  toast.success(message, { duration: 3000 });
}

export function handleWarning(message) {
  toast(message, { duration: 4000 });
}

export function handleInfo(message) {
  toast(message, { duration: 3000 });
}

export default { handleApiError, handleSuccess, handleWarning, handleInfo };
