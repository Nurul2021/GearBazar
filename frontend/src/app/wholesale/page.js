"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShoppingCart,
  Truck,
  Package,
  TrendingUp,
  Users,
  Box,
  ArrowRight,
  Star,
  ChevronRight,
} from "lucide-react";

const wholesaleProducts = [
  {
    _id: "1",
    title: "Brembo Premium Brake Caliper",
    brand: "Brembo",
    price: 189.99,
    wholesalePrice: 145.0,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    ],
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
  },
  {
    _id: "2",
    title: "Monroe Shock Absorber Set",
    brand: "Monroe",
    price: 129.99,
    wholesalePrice: 99.0,
    images: [
      "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=400&q=80",
    ],
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
  },
  {
    _id: "3",
    title: "Bosch Alternator 150A",
    brand: "Bosch",
    price: 249.99,
    wholesalePrice: 199.0,
    images: [
      "https://images.unsplash.com/photo-1552975383-513c7002d408?w=400&q=80",
    ],
    rating: 4.9,
    reviewCount: 156,
    inStock: true,
  },
  {
    _id: "4",
    title: "NGK Iridium Spark Plugs (4pc)",
    brand: "NGK",
    price: 59.99,
    wholesalePrice: 45.0,
    images: [
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&q=80",
    ],
    rating: 4.7,
    reviewCount: 234,
    inStock: true,
  },
  {
    _id: "5",
    title: "Castrol Edge Motor Oil 5W-30",
    brand: "Castrol",
    price: 34.99,
    wholesalePrice: 26.0,
    images: [
      "https://images.unsplash.com/photo-1506368242239-9d49a5466f7a?w=400&q=80",
    ],
    rating: 4.8,
    reviewCount: 312,
    inStock: true,
  },
  {
    _id: "6",
    title: "Michelin Defender Tires",
    brand: "Michelin",
    price: 159.99,
    wholesalePrice: 125.0,
    images: [
      "https://images.unsplash.com/photo-1578844251758-2f0316a63835?w=400&q=80",
    ],
    rating: 4.9,
    reviewCount: 78,
    inStock: true,
  },
];

const stats = [
  { label: "Total Products", value: "12,500+", icon: Package },
  { label: "Garages Served", value: "5,000+", icon: Truck },
  { label: "Orders Delivered", value: "50,000+", icon: ShoppingCart },
  { label: "Happy Customers", value: "4.9★", icon: Star },
];

export default function WholesalePage() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Garage Owner Dashboard
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Exclusive wholesale pricing for verified garage owners and auto
              shops. Save up to 40% on all auto parts.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all"
            >
              Register as Garage <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex border-b">
            {["products", "orders", "messages"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? "bg-red-50 text-red-600 border-b-2 border-red-600"
                    : "text-slate-600 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "products" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    Wholesale Products
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">Sort by:</span>
                    <select className="border rounded-lg px-3 py-2 text-sm">
                      <option>Newest</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Popular</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {wholesaleProducts.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-all"
                    >
                      <div className="relative h-40 bg-gray-100">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                            In Stock
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-slate-500 uppercase font-medium">
                          {product.brand}
                        </p>
                        <h3 className="font-semibold text-slate-900 text-sm mt-1 line-clamp-2">
                          {product.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(product.rating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-slate-500">
                            ({product.reviewCount})
                          </span>
                        </div>
                        <div className="mt-3 flex items-baseline gap-2">
                          <span className="text-lg font-bold text-slate-900">
                            ${product.wholesalePrice}
                          </span>
                          <span className="text-sm text-slate-500 line-through">
                            ${product.price}
                          </span>
                        </div>
                        <button className="w-full mt-3 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-red-600 transition-colors"
                  >
                    View All Products <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No Orders Yet
                </h3>
                <p className="text-slate-500 mb-6">
                  Your wholesale orders will appear here
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors"
                >
                  Browse Products
                </Link>
              </div>
            )}

            {activeTab === "messages" && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No Messages Yet
                </h3>
                <p className="text-slate-500">
                  Messages from suppliers will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
          Why Garage Owners Choose GearBazar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: TrendingUp,
              title: "Up to 40% Off",
              desc: "Exclusive wholesale pricing on all products",
            },
            {
              icon: Truck,
              title: "Fast Delivery",
              desc: "Same-day dispatch & free shipping over $100",
            },
            {
              icon: Users,
              title: "Dedicated Support",
              desc: "24/7 technical support from auto experts",
            },
          ].map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md text-center"
              >
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-slate-600">{benefit.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Ready to Start Saving?
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Register your garage or auto shop today and get instant access to
            wholesale pricing on all auto parts.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all"
          >
            Register Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
