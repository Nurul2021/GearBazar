/**
 * Admin Route Component
 * Wraps content requiring admin role
 */

"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectIsAdmin,
} from "@/features/auth/authSlice";

export default function AdminRoute({ children, fallback = "/unauthorized" }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push(fallback);
    }
  }, [isAuthenticated, isAdmin, router, fallback]);

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return <>{children}</>;
}
