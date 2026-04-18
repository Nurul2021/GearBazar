/**
 * Invoice Download Utility
 * Handles fetching and downloading PDF invoices from the backend
 */

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5003/api";

export async function downloadInvoice(orderId) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) {
    throw new Error("Authentication required");
  }

  const response = await axios.get(`${API_URL}/orders/${orderId}/invoice`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob",
  });

  const contentDisposition = response.headers["content-disposition"];
  let filename = `invoice-${orderId}.pdf`;

  if (contentDisposition) {
    const filenameMatch = contentDisposition.match(
      /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/,
    );
    if (filenameMatch) {
      filename = filenameMatch[1].replace(/['"]/g, "");
    }
  }

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

export default downloadInvoice;
