/**
 * Vendor Route Component
 * Wraps content requiring vendor role (shop, garage_owner, seller)
 */

"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectIsVendor,
} from "@/features/auth/authSlice";

export default function VendorRoute({ children, fallback = "/unauthorized" }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isVendor = useSelector(selectIsVendor);

  useEffect(() => {
    if (!isAuthenticated || !isVendor) {
      router.push(fallback);
    }
  }, [isAuthenticated, isVendor, router, fallback]);

  if (!isAuthenticated || !isVendor) {
    return null;
  }

  return <>{children}</>;
}
