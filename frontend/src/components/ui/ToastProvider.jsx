/**
 * Toast Notification System
 * Custom toast notifications using react-hot-toast with GearBazar styling
 */

"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        iconTheme: {
          primary: "#1e293b",
          secondary: "#fff",
        },
        style: {
          background: "#ffffff",
          color: "#0f172a",
          borderRadius: "12px",
          padding: "12px 16px",
          boxShadow:
            "0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
          fontSize: "14px",
          fontWeight: "500",
        },
        success: {
          icon: "✅",
          style: {
            borderLeft: "4px solid #22c55e",
          },
          duration: 3000,
        },
        error: {
          icon: "❌",
          style: {
            borderLeft: "4px solid #ef4444",
          },
          duration: 5000,
        },
        warning: {
          icon: "⚠️",
          style: {
            borderLeft: "4px solid #f59e0b",
          },
          duration: 4000,
        },
        loading: {
          icon: "⏳",
          style: {
            borderLeft: "4px solid #3b82f6",
          },
        },
      }}
    />
  );
}

export default ToastProvider;
