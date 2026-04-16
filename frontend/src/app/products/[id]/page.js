"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/features/cart/cartSlice";
import {
  ChevronLeft,
  Star,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { mockProducts } from "@/lib/mockData";

function ProductContent() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const { user } = useSelector((state) => state.auth);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (productId) {
      const found = mockProducts.find(
        (p) => p.id === productId || p.slug === productId,
      );
      setProduct(found || mockProducts[0]);
      setLoading(false);
    }
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product) return;
    dispatch(addItem({ productId: product.id, quantity, product }));
  };

  const getPrice = () => {
    if (!product) return 0;
    return product.price || 49.99;
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
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100">
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-slate-500 mb-2">
                  {product.category?.name}
                </p>
                <h1 className="text-3xl font-bold text-slate-900">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating || 0) ? "text-yellow-400 fill-current" : "text-slate-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-slate-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="border-t border-b border-slate-200 py-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-slate-900">
                    ${getPrice().toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-slate-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-2 text-green-600">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>In
                  Stock
                </span>
              </div>

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
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-xl"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-xl border ${isWishlisted ? "bg-red-50 border-red-300 text-red-500" : "border-slate-300 text-slate-400"}`}
                >
                  <Heart
                    className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <Truck className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                  <p className="text-sm font-medium">Free Shipping</p>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                  <p className="text-sm font-medium">Secure Payment</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                  <p className="text-sm font-medium">Easy Returns</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200">
            <div className="flex border-b border-slate-200">
              {["description", "specifications", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium capitalize ${activeTab === tab ? "text-primary-600 border-b-2 border-primary-600" : "text-slate-600"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-8">
              {activeTab === "description" && (
                <p className="text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              )}
              {activeTab === "specifications" && (
                <p className="text-slate-500">No specifications available.</p>
              )}
              {activeTab === "reviews" && (
                <p className="text-slate-500">No reviews yet.</p>
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
