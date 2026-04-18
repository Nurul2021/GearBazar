/**
 * Socket Provider
 * Handles real-time WebSocket connections for order notifications
 */

"use client";

import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "@/features/auth/authSlice";
import toast from "react-hot-toast";

const isDemo = process.env.NEXT_PUBLIC_DEMO === "true";
const SOCKET_URL = isDemo
  ? null
  : process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5003";

export function SocketProvider({ children }) {
  const token = useSelector(selectToken);

  if (isDemo) {
    return <>{children}</>;
  }
  const socketRef = useRef(null);
  const connectedRef = useRef(false);

  useEffect(() => {
    if (!token || typeof window === "undefined") return;
    if (connectedRef.current) return;

    const initSocket = async () => {
      try {
        const { io } = await import("socket.io-client");

        socketRef.current = io(SOCKET_URL, {
          auth: { token },
          transports: ["websocket", "polling"],
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
        });

        socketRef.current.on("connect", () => {
          console.log("[Socket] Connected to server");
          connectedRef.current = true;
        });

        socketRef.current.on("disconnect", (reason) => {
          console.log("[Socket] Disconnected:", reason);
          connectedRef.current = false;
        });

        socketRef.current.on("order_status_updated", (data) => {
          const { orderId, status, message } = data;

          const statusMessages = {
            confirmed: "Your order has been confirmed!",
            processing: "Your order is being processed.",
            shipped: "Your order has been shipped!",
            out_for_delivery: "Your order is out for delivery.",
            delivered: "Your order has been delivered!",
            cancelled: "Your order has been cancelled.",
          };

          const displayMessage =
            message ||
            statusMessages[status] ||
            `Order #${orderId} status: ${status}`;

          toast.success(displayMessage, {
            duration: 6000,
            icon: "📦",
            style: {
              background: "#10B981",
              color: "#fff",
            },
          });
        });

        socketRef.current.on("connect_error", (error) => {
          console.error("[Socket] Connection error:", error.message);
        });
      } catch (error) {
        console.error("[Socket] Failed to initialize:", error);
      }
    };

    initSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        connectedRef.current = false;
      }
    };
  }, [token]);

  return <>{children}</>;
}

export default SocketProvider;
