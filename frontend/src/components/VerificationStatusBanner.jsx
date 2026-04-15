/**
 * Verification Status Banner
 * Shows warning banner for unverified garage owners seeking wholesale access
 */

"use client";

import { useAuth } from "@/hooks/useAuth";
import { AlertTriangle, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function VerificationStatusBanner() {
  const { role, isVerified, isGarageOwner } = useAuth();

  if (!isGarageOwner || isVerified) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-amber-900 font-semibold text-sm">
            Account Under Review for Wholesale Access
          </h3>
          <p className="text-amber-700 text-sm mt-1">
            Your garage verification is being processed. Once approved, you'll
            unlock exclusive wholesale pricing on all products.
          </p>
          <div className="mt-3 flex items-center gap-4">
            <Link
              href="/dashboard/verify"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-800 hover:text-amber-900"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Check Verification Status
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/support"
              className="text-xs text-amber-600 hover:text-amber-800"
            >
              Need Help?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Compact inline verification status badge
 */
export function VerificationBadge({ className = "" }) {
  const { role, isVerified, isGarageOwner } = useAuth();

  if (!isGarageOwner) {
    return null;
  }

  if (isVerified) {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full ${className}`}
      >
        <ShieldCheck className="w-3 h-3" />
        Verified
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full ${className}`}
    >
      <AlertTriangle className="w-3 h-3" />
      Pending
    </span>
  );
}
