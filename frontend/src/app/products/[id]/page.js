"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useCart } from "@/context/CartContext";
import {
  ChevronLeft,
  Star,
  Heart,
  Truck,
  Shield,
  RotateCcw,
  Loader2,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5003/api";

function ProductContent() {
  const params = useParams();
  const productId = params?.id || null;
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/products/${productId}`);
        setProduct(res.data.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product) return;
    await addToCart(product, quantity);
  };

  const getPrice = () => {
    if (!product) return 0;
    return product.pricing?.publicPrice || product.publicPrice || 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-red-600" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Product not found
        </h2>
        <Link href="/products" className="text-red-600 hover:underline">
          Back to products
        </Link>
      </div>
    );
  }

  const images = product.images || [];
  const currentImage =
    images[selectedImage] || "https://via.placeholder.com/400";

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={currentImage}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      idx === selectedImage
                        ? "border-red-600"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-sm text-slate-500 uppercase tracking-wide mb-2">
              {product.brand}
            </p>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.avgRating || 0)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-slate-500">
                ({product.reviewCount || 0} reviews)
              </span>
            </div>

            <p className="text-4xl font-bold text-slate-900 mb-6">
              ${getPrice().toFixed(2)}
            </p>

            <p className="text-slate-600 mb-8">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-slate-300 rounded-xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-slate-100"
                >
                  -
                </button>
                <span className="px-4 py-3 font-medium">{quantity}</span>
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
                className={`p-3 rounded-xl border ${
                  isWishlisted
                    ? "bg-red-50 border-red-300 text-red-500"
                    : "border-slate-300 text-slate-400"
                }`}
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
      </div>
    </div>
  );
}

export default function ProductPage() {
  return <ProductContent />;
}
