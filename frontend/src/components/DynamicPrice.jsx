/**
 * Dynamic Price Display
 * Shows different prices based on user verification status
 * - Verified garage owners see wholesalePrice with 'B2B Exclusive' badge
 * - Unverified users see publicPrice with tooltip
 */

"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Info, BadgeCheck } from "lucide-react";

export default function DynamicPrice({
  product,
  showSavings = true,
  size = "md",
  className = "",
}) {
  const { role, isVerified, isGarageOwner, isAuthenticated } = useAuth();

  const publicPrice = product.publicPrice ?? product.price ?? 0;
  const wholesalePrice = product.wholesalePrice ?? product.price ?? 0;
  const garagePrice = product.garagePrice ?? wholesalePrice;

  const isVerifiedGarage = role === "garage_owner" && isVerified;
  const isVendor = role === "shop" || role === "seller";

  const displayPrice = isVerifiedGarage
    ? garagePrice
    : isVendor
      ? wholesalePrice
      : publicPrice;
  const originalPrice = publicPrice;
  const savings = originalPrice - displayPrice;
  const savingsPercent =
    originalPrice > 0 ? Math.round((savings / originalPrice) * 100) : 0;

  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {/* Main Price */}
      <div className="flex items-baseline gap-2">
        <span className={`font-bold text-slate-900 ${sizeClasses[size]}`}>
          ${displayPrice.toFixed(2)}
        </span>

        {/* B2B Exclusive Badge for Verified Users */}
        {isVerifiedGarage && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-medium rounded-full">
            <BadgeCheck className="w-3 h-3" />
            B2B Exclusive
          </span>
        )}

        {/* Tooltip for unverified users */}
        {!isVerifiedGarage && (isGarageOwner || !isAuthenticated) && (
          <PriceTooltip
            isGarageOwner={isGarageOwner}
            isAuthenticated={isAuthenticated}
          />
        )}
      </div>

      {/* Savings Badge */}
      {showSavings && savings > 0 && !isVerifiedGarage && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500 line-through">
            ${originalPrice.toFixed(2)}
          </span>
          <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
            Save {savingsPercent}%
          </span>
        </div>
      )}

      {/* Wholesale Price Hint for Verified */}
      {isVerifiedGarage && wholesalePrice > displayPrice && (
        <p className="text-xs text-slate-500">
          Wholesale: ${wholesalePrice.toFixed(2)}
        </p>
      )}
    </div>
  );
}

function PriceTooltip({ isGarageOwner, isAuthenticated }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Info className="w-4 h-4 text-slate-400 cursor-help" />

      {showTooltip && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-slate-800 text-white text-xs rounded-lg p-3 shadow-xl">
          <p className="font-medium mb-1">
            {isGarageOwner
              ? "Verification pending"
              : "Wholesale pricing available"}
          </p>
          <p className="text-slate-300">
            {isGarageOwner
              ? "Log in as a verified garage for wholesale rates"
              : "Register as a garage owner and get verified to access exclusive B2B pricing"}
          </p>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-slate-800" />
        </div>
      )}
    </div>
  );
}

/**
 * Simplified price only component for compact displays
 */
export function PriceOnly({ product, className = "" }) {
  const { role, isVerified } = useAuth();

  const publicPrice = product.publicPrice ?? product.price ?? 0;
  const wholesalePrice = product.wholesalePrice ?? product.price ?? 0;
  const garagePrice = product.garagePrice ?? wholesalePrice;

  const displayPrice =
    role === "garage_owner" && isVerified ? garagePrice : publicPrice;

  return (
    <span className={`font-bold text-slate-900 ${className}`}>
      ${displayPrice.toFixed(2)}
    </span>
  );
}

/**
 * Badge to show price type
 */
export function PriceTypeBadge({ product }) {
  const { role, isVerified } = useAuth();

  if (role === "garage_owner" && isVerified) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded">
        Garage Price
      </span>
    );
  }

  if (role === "shop" || role === "seller") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
        Wholesale
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded">
      Retail
    </span>
  );
}
