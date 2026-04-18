const isDemo = process.env.NEXT_PUBLIC_DEMO === "true";
export const API_URL = isDemo
  ? "/api"
  : process.env.NEXT_PUBLIC_API_URL || "http://localhost:5003/api";
export const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5003";
