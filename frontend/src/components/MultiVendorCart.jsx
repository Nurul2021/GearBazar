/**
 * Multi-Vendor Shopping Cart
 * Grouped cart UI with vendor breakdown, shipping calculation, and grand total
 */

"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Store,
  Trash2,
  Minus,
  Plus,
  Truck,
  Package,
  ShieldCheck,
  Info,
  ArrowRight,
  CreditCard,
} from "lucide-react";

const PLATFORM_FEE = 15.0;
const TAX_RATE = 0.08;

const mockCartData = [
  {
    vendorId: "v1",
    vendorName: "Rahim Auto Parts",
    vendorVerified: true,
    shippingMethod: "standard",
    shippingCost: 25.0,
    freeShippingThreshold: 200,
    items: [
      {
        productId: "p1",
        title: "Brembo Premium Brake Pad Set",
        brand: "Brembo",
        image: "/api/placeholder/100/100",
        publicPrice: 89.99,
        wholesalePrice: 65.0,
        garagePrice: 55.0,
        quantity: 2,
        inStock: true,
      },
      {
        productId: "p2",
        title: "NGK Iridium Spark Plugs (4 Pack)",
        brand: "NGK",
        image: "/api/placeholder/100/100",
        publicPrice: 24.99,
        wholesalePrice: 18.0,
        garagePrice: 15.0,
        quantity: 1,
        inStock: true,
      },
    ],
  },
  {
    vendorId: "v2",
    vendorName: "Dhaka Motor Works",
    vendorVerified: true,
    shippingMethod: "express",
    shippingCost: 45.0,
    freeShippingThreshold: 300,
    items: [
      {
        productId: "p3",
        title: "Mobil 1 Synthetic Oil 5W-30 (5L)",
        brand: "Mobil",
        image: "/api/placeholder/100/100",
        publicPrice: 42.99,
        wholesalePrice: 35.0,
        garagePrice: 30.0,
        quantity: 3,
        inStock: true,
      },
    ],
  },
  {
    vendorId: "v3",
    vendorName: "Chittagong Auto Garage",
    vendorVerified: false,
    shippingMethod: "standard",
    shippingCost: 30.0,
    freeShippingThreshold: 250,
    items: [
      {
        productId: "p4",
        title: "Bosch Air Filter",
        brand: "Bosch",
        image: "/api/placeholder/100/100",
        publicPrice: 19.99,
        wholesalePrice: 14.0,
        garagePrice: 12.0,
        quantity: 1,
        inStock: true,
      },
    ],
  },
];

export default function MultiVendorCart() {
  const [cartData, setCartData] = useState(mockCartData);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupons, setAppliedCoupons] = useState({});

  const getUserPrice = (item, role = "customer", isVerified = false) => {
    if (role === "garage_owner" && isVerified)
      return item.garagePrice || item.wholesalePrice;
    if (role === "shop" || role === "seller") return item.wholesalePrice;
    return item.publicPrice;
  };

  const handleQuantityChange = (vendorId, productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartData((prev) =>
      prev.map((vendor) => {
        if (vendor.vendorId === vendorId) {
          return {
            ...vendor,
            items: vendor.items.map((item) =>
              item.productId === productId
                ? { ...item, quantity: newQuantity }
                : item,
            ),
          };
        }
        return vendor;
      }),
    );
  };

  const handleRemoveItem = (vendorId, productId) => {
    setCartData((prev) =>
      prev.map((vendor) => {
        if (vendor.vendorId === vendorId) {
          return {
            ...vendor,
            items: vendor.items.filter((item) => item.productId !== productId),
          };
        }
        return vendor;
      }),
    );
  };

  const vendorTotals = useMemo(() => {
    return cartData.map((vendor) => {
      const subtotal = vendor.items.reduce((sum, item) => {
        return sum + getUserPrice(item) * item.quantity;
      }, 0);

      const shipping =
        subtotal >= vendor.freeShippingThreshold ? 0 : vendor.shippingCost;
      const tax = subtotal * TAX_RATE;

      return {
        vendorId: vendor.vendorId,
        vendorName: vendor.vendorName,
        itemCount: vendor.items.reduce((sum, item) => sum + item.quantity, 0),
        subtotal,
        shipping,
        tax,
        total: subtotal + shipping + tax,
      };
    });
  }, [cartData]);

  const grandTotal = useMemo(() => {
    return (
      vendorTotals.reduce((sum, vendor) => {
        return sum + vendor.total;
      }, 0) + PLATFORM_FEE
    );
  }, [vendorTotals]);

  const applyCoupon = (vendorId) => {
    if (couponCode.toUpperCase() === "SAVE10") {
      setAppliedCoupons((prev) => ({
        ...prev,
        [vendorId]:
          vendorTotals.find((v) => v.vendorId === vendorId)?.subtotal * 0.1 ||
          0,
      }));
    }
    setCouponCode("");
  };

  const isEmpty = cartData.every((v) => v.items.length === 0);

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-slate-600 mb-6">
            Looks like you haven't added any items yet.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700"
          >
            Browse Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartData.map((vendor) => (
              <div
                key={vendor.vendorId}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                {/* Vendor Header */}
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
                        <Store className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                          Sold by: {vendor.vendorName}
                          {vendor.vendorVerified && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                              <ShieldCheck className="w-3 h-3" />
                              Verified
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {vendor.items.length} items
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Truck className="w-4 h-4" />
                      <span>
                        {vendor.shippingMethod === "express"
                          ? "Express"
                          : "Standard"}{" "}
                        Delivery
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cart Items List */}
                <div className="divide-y divide-slate-100">
                  {vendor.items.map((item) => (
                    <div key={item.productId} className="p-4 sm:p-6 flex gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                          {item.brand}
                        </p>
                        <h4 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2 mb-2">
                          {item.title}
                        </h4>

                        <div className="flex items-center justify-between">
                          {/* Quantity Toggle */}
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  vendor.vendorId,
                                  item.productId,
                                  item.quantity - 1,
                                )
                              }
                              disabled={item.quantity <= 1}
                              className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-lg disabled:opacity-50"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-10 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  vendor.vendorId,
                                  item.productId,
                                  item.quantity + 1,
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-lg"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Price & Remove */}
                          <div className="text-right">
                            <p className="text-lg font-bold text-slate-900">
                              ${(getUserPrice(item) * item.quantity).toFixed(2)}
                            </p>
                            <button
                              onClick={() =>
                                handleRemoveItem(
                                  vendor.vendorId,
                                  item.productId,
                                )
                              }
                              className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Vendor Subtotal Footer */}
                  <div className="bg-slate-50 px-6 py-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          placeholder="Coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="px-3 py-2 border border-slate-300 rounded-lg text-sm w-32"
                        />
                        <button
                          onClick={() => applyCoupon(vendor.vendorId)}
                          className="px-4 py-2 bg-slate-800 text-white text-sm rounded-lg hover:bg-slate-700"
                        >
                          Apply
                        </button>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-slate-600">Subtotal:</span>
                        <span className="font-bold text-slate-900">
                          $
                          {vendorTotals
                            .find((v) => v.vendorId === vendor.vendorId)
                            ?.subtotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Order Summary
              </h2>

              {/* Vendor Breakdown */}
              <div className="space-y-4 mb-6">
                {vendorTotals.map((vendor) => (
                  <div
                    key={vendor.vendorId}
                    className="p-4 bg-slate-50 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">
                        {vendor.vendorName}
                      </span>
                      <span className="text-xs text-slate-500">
                        {vendor.itemCount} items
                      </span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between text-slate-600">
                        <span>Subtotal</span>
                        <span>${vendor.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Shipping</span>
                        <span
                          className={
                            vendor.shipping === 0 ? "text-green-600" : ""
                          }
                        >
                          {vendor.shipping === 0
                            ? "Free"
                            : `$${vendor.shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Tax</span>
                        <span>${vendor.tax.toFixed(2)}</span>
                      </div>
                      {vendor.subtotal <
                        cartData.find((v) => v.vendorId === vendor.vendorId)
                          ?.freeShippingThreshold && (
                        <div className="flex items-center gap-1 text-xs text-amber-600">
                          <Info className="w-3 h-3" />
                          <span>
                            Add $
                            {(
                              cartData.find(
                                (v) => v.vendorId === vendor.vendorId,
                              )?.freeShippingThreshold - vendor.subtotal
                            ).toFixed(2)}{" "}
                            for free shipping
                          </span>
                        </div>
                      )}
                      <div className="border-t border-slate-200 pt-2 mt-2 flex justify-between font-semibold">
                        <span>Vendor Total</span>
                        <span>${vendor.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Platform Fee & Grand Total */}
              <div className="border-t border-slate-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span>
                    $
                    {vendorTotals
                      .reduce((s, v) => s + v.subtotal, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Shipping (All Vendors)</span>
                  <span>
                    $
                    {vendorTotals
                      .reduce((s, v) => s + v.shipping, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Tax</span>
                  <span>
                    ${vendorTotals.reduce((s, v) => s + v.tax, 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    Platform Fee
                    <Info className="w-3 h-3 text-slate-400" />
                  </span>
                  <span>${PLATFORM_FEE.toFixed(2)}</span>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-slate-900">
                      Grand Total
                    </span>
                    <span className="text-2xl font-bold text-primary-600">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full mt-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5" />
                Proceed to Checkout
              </button>

              <p className="mt-4 text-xs text-slate-500 text-center">
                Secure checkout powered by GearBazar
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
