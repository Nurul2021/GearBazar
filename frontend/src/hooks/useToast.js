/**
 * Toast Hook
 * Easy-to-use toast notifications throughout the app
 */

"use client";

import toast from "react-hot-toast";

export const useToast = () => {
  return {
    success: (message, options = {}) => toast.success(message, options),
    error: (message, options = {}) => toast.error(message, options),
    warning: (message, options = {}) =>
      toast(message, { icon: "⚠️", ...options }),
    loading: (message, options = {}) => toast.loading(message, options),
    dismiss: (id) => toast.dismiss(id),
    promise: (promise, messages = {}, toastOptions = {}) =>
      toast.promise(
        promise,
        {
          loading: messages.loading || "Loading...",
          success: messages.success || "Success!",
          error: messages.error || "Error occurred",
        },
        toastOptions,
      ),
  };
};

// Standalone toast functions for use outside components
export const notify = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  warning: (message) => toast(message, { icon: "⚠️" }),
  loading: (message) => toast.loading(message),
};

export default useToast;
