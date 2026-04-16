"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  XCircle,
  Sparkles,
  ShoppingCart,
  Heart,
} from "lucide-react";
import { useProducts } from "@/hooks/queries/useProducts";
import { useCart } from "@/context/CartContext";

export default function LatestProductsGrid() {
  const { data: products, isLoading } = useProducts({
    sort: "-createdAt",
    limit: 10,
  });
  const { addToCart } = useCart();

  const savedVehicle = null;

  const checkCompatibility = (product) => {
    if (!savedVehicle) return null;
    const fits = product.compatibleVehicles?.includes(savedVehicle);
    return fits;
  };

  const handleAddToCart = async (e, product) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6 text-red-600" />
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                Latest Products
              </h2>
            </div>
            <p className="text-slate-600">
              Just added - fresh inventory for your vehicle
            </p>
          </div>
          <Link
            href="/products?sort=-createdAt"
            className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-red-600 transition-all"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-xl mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {(products || []).slice(0, 10).map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/products?sort=-createdAt"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-red-600 transition-all"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, onAddToCart }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const savedVehicle = null;
  const isCompatible = savedVehicle
    ? product.compatibleVehicles?.includes(savedVehicle)
    : null;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Link
      href={`/products/${product.id || product._id}`}
      className="group block"
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
        <div className="relative h-36 lg:h-40 overflow-hidden">
          <Image
            src={
              product.images?.[0] ||
              "https://via.placeholder.com/300x300?text=No+Image"
            }
            alt={product.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              New
            </span>
          </div>
          {isCompatible !== null && (
            <div className="absolute top-2 right-2">
              {isCompatible ? (
                <div
                  className="p-1.5 bg-green-500 text-white rounded-full"
                  title="Fits your vehicle"
                >
                  <CheckCircle className="w-4 h-4" />
                </div>
              ) : (
                <div
                  className="p-1.5 bg-red-500 text-white rounded-full"
                  title="Doesn't fit your vehicle"
                >
                  <XCircle className="w-4 h-4" />
                </div>
              )}
            </div>
          )}
          <button
            onClick={handleWishlist}
            className={`absolute bottom-2 right-2 p-1.5 rounded-full transition-all ${
              isWishlisted
                ? "bg-red-500 text-white"
                : "bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
            />
          </button>
        </div>

        <div className="p-3">
          <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">
            {product.brand}
          </p>
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 group-hover:text-red-600 transition-colors mt-1">
            {product.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
            {product.description?.slice(0, 50)}...
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-slate-900">
              ${product.price?.toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={isAdding || !product.inStock}
              className="p-1.5 bg-slate-900 text-white rounded-lg hover:bg-red-600 transition-all"
            >
              {isAdding ? (
                <span className="block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <ShoppingCart className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
