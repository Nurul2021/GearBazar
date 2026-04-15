/**
 * API Service Layer
 * Type-safe API calls using the secure axios instance
 */

import api from "./axios";

export const authApi = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  logout: () => api.post("/auth/logout"),
  getMe: () => api.get("/auth/me"),
  refreshToken: (refreshToken) =>
    api.post("/auth/refresh-token", { refreshToken }),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword: (data) => api.post("/auth/reset-password", data),
  verifyEmail: (token) => api.post("/auth/verify-email", { token }),
};

export const productApi = {
  getAll: (params) => api.get("/products", { params }),
  getById: (id) => api.get(`/products/${id}`),
  getBySlug: (slug) => api.get(`/products/slug/${slug}`),
  search: (query) => api.get("/products/search", { params: { q: query } }),
  getFeatured: () => api.get("/products/featured"),
  getCategories: () => api.get("/products/categories"),
  create: (data) => api.post("/products", data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

export const cartApi = {
  get: () => api.get("/cart"),
  addItem: (productId, quantity = 1) =>
    api.post("/cart/add", { productId, quantity }),
  updateItem: (itemId, quantity) =>
    api.put(`/cart/items/${itemId}`, { quantity }),
  removeItem: (itemId) => api.delete(`/cart/items/${itemId}`),
  clear: () => api.delete("/cart/clear"),
  applyCoupon: (code) => api.post("/cart/apply-coupon", { code }),
};

export const orderApi = {
  getAll: (params) => api.get("/orders", { params }),
  getById: (id) => api.get(`/orders/${id}`),
  create: (orderData) => api.post("/orders", orderData),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  cancel: (id) => api.post(`/orders/${id}/cancel`),
  getByUser: (userId) => api.get(`/orders/user/${userId}`),
  getByVendor: (vendorId) => api.get(`/orders/vendor/${vendorId}`),
};

export const userApi = {
  getProfile: () => api.get("/users/profile"),
  updateProfile: (data) => api.put("/users/profile", data),
  updatePassword: (data) => api.put("/users/password", data),
  getAddresses: () => api.get("/users/addresses"),
  addAddress: (data) => api.post("/users/addresses", data),
  updateAddress: (id, data) => api.put(`/users/addresses/${id}`, data),
  deleteAddress: (id) => api.delete(`/users/addresses/${id}`),
};

export const vendorApi = {
  getProfile: () => api.get("/vendors/profile"),
  updateProfile: (data) => api.put("/vendors/profile", data),
  getProducts: (params) => api.get("/vendors/products", { params }),
  getOrders: (params) => api.get("/vendors/orders", { params }),
  getStats: () => api.get("/vendors/stats"),
  getAnalytics: (params) => api.get("/vendors/analytics", { params }),
};

export const adminApi = {
  getUsers: (params) => api.get("/admin/users", { params }),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getProducts: (params) => api.get("/admin/products", { params }),
  getOrders: (params) => api.get("/admin/orders", { params }),
  getAnalytics: () => api.get("/admin/admin-analytics"),
  getQuickStats: () => api.get("/analytics/quick"),
  getSettings: () => api.get("/admin/settings"),
  updateSettings: (data) => api.put("/admin/settings", data),
};

export const categoryApi = {
  getAll: () => api.get("/categories"),
  getById: (id) => api.get(`/categories/${id}`),
  create: (data) => api.post("/categories", data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
};

export const reviewApi = {
  getByProduct: (productId, params) =>
    api.get(`/reviews/product/${productId}`, { params }),
  create: (data) => api.post("/reviews", data),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`),
};

export const wishlistApi = {
  get: () => api.get("/wishlist"),
  add: (productId) => api.post("/wishlist", { productId }),
  remove: (productId) => api.delete(`/wishlist/${productId}`),
  check: (productId) => api.get(`/wishlist/check/${productId}`),
};

export const paymentApi = {
  initiate: (orderId) => api.post("/payments/initiate", { orderId }),
  verify: (paymentData) => api.post("/payments/verify", paymentData),
  getMethods: () => api.get("/payments/methods"),
  getHistory: (params) => api.get("/payments/history", { params }),
};

export default {
  auth: authApi,
  products: productApi,
  cart: cartApi,
  orders: orderApi,
  users: userApi,
  vendors: vendorApi,
  admin: adminApi,
  categories: categoryApi,
  reviews: reviewApi,
  wishlist: wishlistApi,
  payments: paymentApi,
};
