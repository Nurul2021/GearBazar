/**
 * Library Index
 * Centralized exports for utility functions and API clients
 */

export { default as axios, api, injectToken, createApiInstance } from "./axios";
export * from "./api";
export {
  formatCurrency,
  formatDate,
  formatRelativeTime,
  generateId,
  debounce,
  throttle,
  getInitials,
  truncate,
  isValidEmail,
  isValidPhone,
  parseQuery,
  buildQuery,
  deepClone,
  isEmpty,
  sortBy,
  groupBy,
  capitalize,
  slugify,
  sleep,
  copyToClipboard,
  downloadFile,
  getStatusColor,
  formatFileSize,
} from "./utils";
