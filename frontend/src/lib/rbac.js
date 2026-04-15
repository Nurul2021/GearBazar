/**
 * Role-based Access Control (RBAC) Utilities
 * Helper functions for role-based navigation and permissions
 */

export const ROLES = {
  ADMIN: "admin",
  GARAGE_OWNER: "garage_owner",
  SHOP: "shop",
  SELLER: "seller",
  CUSTOMER: "customer",
};

export const ROLE_LABELS = {
  [ROLES.ADMIN]: "Administrator",
  [ROLES.GARAGE_OWNER]: "Garage Owner",
  [ROLES.SHOP]: "Shop Owner",
  [ROLES.SELLER]: "Seller",
  [ROLES.CUSTOMER]: "Customer",
};

export const ROLE_ROUTES = {
  [ROLES.ADMIN]: "/admin",
  [ROLES.GARAGE_OWNER]: "/vendor",
  [ROLES.SHOP]: "/vendor",
  [ROLES.SELLER]: "/vendor",
  [ROLES.CUSTOMER]: "/dashboard",
};

export const PERMISSIONS = {
  MANAGE_PRODUCTS: "manage_products",
  MANAGE_ORDERS: "manage_orders",
  MANAGE_USERS: "manage_users",
  MANAGE_SETTINGS: "manage_settings",
  VIEW_ANALYTICS: "view_analytics",
  VERIFY_USERS: "verify_users",
  MANAGE_PAYMENTS: "manage_payments",
};

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    PERMISSIONS.MANAGE_PRODUCTS,
    PERMISSIONS.MANAGE_ORDERS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_SETTINGS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VERIFY_USERS,
    PERMISSIONS.MANAGE_PAYMENTS,
  ],
  [ROLES.GARAGE_OWNER]: [PERMISSIONS.MANAGE_ORDERS, PERMISSIONS.VIEW_ANALYTICS],
  [ROLES.SHOP]: [
    PERMISSIONS.MANAGE_PRODUCTS,
    PERMISSIONS.MANAGE_ORDERS,
    PERMISSIONS.VIEW_ANALYTICS,
  ],
  [ROLES.SELLER]: [
    PERMISSIONS.MANAGE_PRODUCTS,
    PERMISSIONS.MANAGE_ORDERS,
    PERMISSIONS.VIEW_ANALYTICS,
  ],
  [ROLES.CUSTOMER]: [],
};

export const hasPermission = (role, permission) => {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
};

export const hasAnyPermission = (role, permissions) => {
  const userPermissions = ROLE_PERMISSIONS[role] || [];
  return permissions.some((permission) => userPermissions.includes(permission));
};

export const getDashboardRoute = (role) => {
  return ROLE_ROUTES[role] || "/dashboard";
};

export const canAccessRoute = (userRole, route) => {
  const roleRoutes = Object.values(ROLE_ROUTES);
  const isVendorRoute =
    route.startsWith("/vendor") || route.startsWith("/admin");

  if (isVendorRoute && userRole === ROLES.CUSTOMER) {
    return false;
  }

  return true;
};

export const getRoleBadgeColor = (role) => {
  const colors = {
    [ROLES.ADMIN]: "bg-red-100 text-red-800",
    [ROLES.GARAGE_OWNER]: "bg-purple-100 text-purple-800",
    [ROLES.SHOP]: "bg-blue-100 text-blue-800",
    [ROLES.SELLER]: "bg-green-100 text-green-800",
    [ROLES.CUSTOMER]: "bg-gray-100 text-gray-800",
  };
  return colors[role] || "bg-gray-100 text-gray-800";
};

export const formatRole = (role) => {
  return ROLE_LABELS[role] || role;
};

export default {
  ROLES,
  ROLE_LABELS,
  ROLE_ROUTES,
  PERMISSIONS,
  ROLE_PERMISSIONS,
  hasPermission,
  hasAnyPermission,
  getDashboardRoute,
  canAccessRoute,
  getRoleBadgeColor,
  formatRole,
};
