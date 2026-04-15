/**
 * Auth Hook
 * Easy-to-use hook for accessing auth state and actions
 */

"use client";

import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import {
  loginUser,
  registerUser,
  loadUser,
  logoutUser,
  updateProfile,
  logout,
  clearErrors,
  setUser,
  selectUser,
  selectToken,
  selectIsAuthenticated,
  selectIsVerified,
  selectRole,
  selectLoading,
  selectError,
  selectIsAdmin,
  selectIsGarageOwner,
  selectIsShop,
  selectIsSeller,
  selectIsCustomer,
  selectIsVendor,
  selectIsVerifiedGarageOwner,
  selectIsVerifiedShop,
  selectUserName,
  selectUserEmail,
  selectUserAvatar,
} from "@/features/auth/authSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isVerified = useSelector(selectIsVerified);
  const role = useSelector(selectRole);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const isAdmin = useSelector(selectIsAdmin);
  const isGarageOwner = useSelector(selectIsGarageOwner);
  const isShop = useSelector(selectIsShop);
  const isSeller = useSelector(selectIsSeller);
  const isCustomer = useSelector(selectIsCustomer);
  const isVendor = useSelector(selectIsVendor);
  const isVerifiedGarageOwner = useSelector(selectIsVerifiedGarageOwner);
  const isVerifiedShop = useSelector(selectIsVerifiedShop);

  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const userAvatar = useSelector(selectUserAvatar);

  const login = useCallback(
    async (credentials, redirectTo = "/dashboard") => {
      const result = await dispatch(loginUser(credentials));
      if (loginUser.fulfilled.match(result)) {
        router.push(redirectTo);
        return true;
      }
      return false;
    },
    [dispatch, router],
  );

  const register = useCallback(
    async (userData, redirectTo = "/dashboard") => {
      const result = await dispatch(registerUser(userData));
      if (registerUser.fulfilled.match(result)) {
        router.push(redirectTo);
        return true;
      }
      return false;
    },
    [dispatch, router],
  );

  const checkAuth = useCallback(async () => {
    if (token && !user) {
      await dispatch(loadUser());
    }
  }, [dispatch, token, user]);

  const logout = useCallback(async () => {
    await dispatch(logoutUser());
    router.push("/login");
  }, [dispatch, router]);

  const updateUserProfile = useCallback(
    async (userData) => {
      const result = await dispatch(updateProfile(userData));
      return updateProfile.fulfilled.match(result);
    },
    [dispatch],
  );

  const hasRole = useCallback(
    (...roles) => {
      return roles.includes(role);
    },
    [role],
  );

  const canAccess = useCallback(
    (requiredRoles = [], requireVerified = false) => {
      if (!isAuthenticated) return false;
      if (requiredRoles.length > 0 && !requiredRoles.includes(role))
        return false;
      if (requireVerified && !isVerified) return false;
      return true;
    },
    [isAuthenticated, role, isVerified],
  );

  const requireAuth = useCallback(
    (redirectTo = "/login") => {
      if (!isAuthenticated) {
        router.push(`${redirectTo}?redirect=${pathname}`);
        return false;
      }
      return true;
    },
    [isAuthenticated, router, pathname],
  );

  const requireRole = useCallback(
    (allowedRoles, redirectTo = "/unauthorized") => {
      if (!isAuthenticated) {
        router.push(`/login?redirect=${pathname}`);
        return false;
      }
      if (!allowedRoles.includes(role)) {
        router.push(redirectTo);
        return false;
      }
      return true;
    },
    [isAuthenticated, role, router, pathname],
  );

  const authState = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      isVerified,
      role,
      loading,
      error,
      isAdmin,
      isGarageOwner,
      isShop,
      isSeller,
      isCustomer,
      isVendor,
      isVerifiedGarageOwner,
      isVerifiedShop,
      userName,
      userEmail,
      userAvatar,
    }),
    [
      user,
      token,
      isAuthenticated,
      isVerified,
      role,
      loading,
      error,
      isAdmin,
      isGarageOwner,
      isShop,
      isSeller,
      isCustomer,
      isVendor,
      isVerifiedGarageOwner,
      isVerifiedShop,
      userName,
      userEmail,
      userAvatar,
    ],
  );

  const actions = useMemo(
    () => ({
      login,
      register,
      logout,
      checkAuth,
      updateProfile: updateUserProfile,
      clearErrors: () => dispatch(clearErrors()),
      setUser: (userData) => dispatch(setUser(userData)),
    }),
    [login, register, logout, checkAuth, updateUserProfile, dispatch],
  );

  const helpers = useMemo(
    () => ({
      hasRole,
      canAccess,
      requireAuth,
      requireRole,
    }),
    [hasRole, canAccess, requireAuth, requireRole],
  );

  return { ...authState, ...actions, ...helpers };
}

export default useAuth;
