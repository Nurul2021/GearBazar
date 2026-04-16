"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useCart } from "@/context/CartContext";
import {
  Star,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import axios from "axios";
import { mockProducts } from "@/lib/mockData";

const isDemo = process.env.NEXT_PUBLIC_DEMO === "true";
const API_URL = isDemo ? "/api" : "/api";

export default async function ProductPage({ params }) {
  const productId = params.id;
  const { user } = useSelector((state) => state.auth);
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      if (isDemo) {
        const found = mockProducts.find(p => p.id === productId || p.slug === productId);
        setProduct(found || mockProducts[0]);
      } else {
        const res = await axios.get(`${API_URL}/products/${productId}`);
        setProduct(res.data.data);
      }
    } catch (error) {
      setProduct(mockProducts[0]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    await addToCart(product, quantity);
  };

  const getPrice = () => {
    if (!product) return 0;
    if (user?.role === "garage_owner")
      return product.garagePrice || product.wholesalePrice;
    if (user?.role === "seller") return product.wholesalePrice;
    return product.publicPrice || product.price;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Product not found
        </h2>
        <Link href="/products" className="text-primary-600 hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  const images =
    product.images?.length > 0
      ? product.images
      : [
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Products
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100">
                <Image
                  src={images[selectedImage]}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
                {product.discount > 0 && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full font-semibold">
                    -{product.discount}%
                  </span>
                )}
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 ${
                      selectedImage === idx
                        ? "border-primary-600"
                        : "border-transparent"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-slate-500 mb-2">{product.brand}</p>
                <h1 className="text-3xl font-bold text-slate-900">
                  {product.title}
                </h1>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating || 0)
                            ? "text-yellow-400 fill-current"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-slate-600">
                    {product.rating?.toFixed(1)} ({product.reviewCount || 0}{" "}
                    reviews)
                  </span>
                </div>
              </div>

              <div className="border-t border-b border-slate-200 py-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-slate-900">
                    ${getPrice().toFixed(2)}
                  </span>
                  {product.publicPrice && (
                    <span className="text-xl text-slate-500 line-through">
                      ${product.publicPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 mt-2">
                  {user?.role === "garage_owner" && "Garage Owner Price"}
                  {user?.role === "seller" && "Wholesale Price"}
                  {!user?.role && "Public Price"}
                </p>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {product.inStock ? (
                  <span className="flex items-center gap-2 text-green-600">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    In Stock
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-red-600">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-slate-300 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="px-4 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-xl border ${
                    isWishlisted
                      ? "bg-red-50 border-red-300 text-red-500"
                      : "border-slate-300 text-slate-400 hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </button>
                <button className="p-3 rounded-xl border border-slate-300 text-slate-400 hover:text-slate-600">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <Truck className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                  <p className="text-sm font-medium">Free Shipping</p>
                  <p className="text-xs text-slate-500">On orders $50+</p>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                  <p className="text-sm font-medium">Secure Payment</p>
                  <p className="text-xs text-slate-500">100% Protected</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                  <p className="text-sm font-medium">Easy Returns</p>
                  <p className="text-xs text-slate-500">30-day policy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-slate-200">
            <div className="flex border-b border-slate-200">
              {[
                "description",
                "specifications",
                "compatibility",
                "reviews",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium capitalize ${
                    activeTab === tab
                      ? "text-primary-600 border-b-2 border-primary-600"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-8">
              {activeTab === "description" && (
                <div className="prose max-w-none">
                  <p className="text-slate-600 leading-relaxed">
                    {product.description ||
                      "No description available for this product."}
                  </p>
                </div>
              )}
              {activeTab === "specifications" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specifications &&
                    Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between p-3 bg-slate-50 rounded-lg"
                        >
                          <span className="font-medium text-slate-700">
                            {key}
                          </span>
                          <span className="text-slate-600">{value}</span>
                        </div>
                      ),
                    )}
                  {!product.specifications && (
                    <p className="text-slate-500">
                      No specifications available.
                    </p>
                  )}
                </div>
              )}
              {activeTab === "compatibility" && (
                <div>
                  {product.compatibilities?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {product.compatibilities.map((comp, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 rounded-lg">
                          <p className="font-medium">
                            {comp.make} {comp.model}
                          </p>
                          <p className="text-slate-500">{comp.year}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500">
                      No compatibility information available.
                    </p>
                  )}
                </div>
              )}
              {activeTab === "reviews" && (
                <div>
                  <p className="text-slate-500">
                    No reviews yet. Be the first to review this product.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      }
    >
      <ProductContent />
    </Suspense>
  );
}
