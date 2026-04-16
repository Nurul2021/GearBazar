"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Heart,
  Star,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import DynamicPrice from "./DynamicPrice";

export default function FeaturedProductsCarousel() {
  const [products, setProducts] = useState([
    {
      _id: "1",
      title: "Brembo Premium Brake Caliper",
      brand: "Brembo",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      ],
      publicPrice: 189.99,
      wholesalePrice: 145.0,
      rating: 4.8,
      reviewCount: 124,
      inStock: true,
      isFeatured: true,
    },
    {
      _id: "2",
      title: "Monroe Shock Absorber Set",
      brand: "Monroe",
      images: [
        "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=400&q=80",
      ],
      publicPrice: 129.99,
      wholesalePrice: 99.0,
      rating: 4.6,
      reviewCount: 89,
      inStock: true,
      isFeatured: true,
    },
    {
      _id: "3",
      title: "Bosch Alternator 150A",
      brand: "Bosch",
      images: [
        "https://images.unsplash.com/photo-1552975383-513c7002d408?w=400&q=80",
      ],
      publicPrice: 249.99,
      wholesalePrice: 199.0,
      rating: 4.9,
      reviewCount: 156,
      inStock: true,
      isFeatured: true,
    },
    {
      _id: "4",
      title: "NGK Iridium Spark Plugs (4pc)",
      brand: "NGK",
      images: [
        "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&q=80",
      ],
      publicPrice: 59.99,
      wholesalePrice: 45.0,
      rating: 4.7,
      reviewCount: 234,
      inStock: true,
      isFeatured: true,
    },
    {
      _id: "5",
      title: "Castrol Edge Motor Oil 5W-30",
      brand: "Castrol",
      images: [
        "https://images.unsplash.com/photo-1506368242239-9d49a5466f7a?w=400&q=80",
      ],
      publicPrice: 34.99,
      wholesalePrice: 26.0,
      rating: 4.8,
      reviewCount: 312,
      inStock: true,
      isFeatured: true,
    },
    {
      _id: "6",
      title: "Michelin Defender Tires",
      brand: "Michelin",
      images: [
        "https://images.unsplash.com/photo-1578844251758-2f0316a63835?w=400&q=80",
      ],
      publicPrice: 159.99,
      wholesalePrice: 125.0,
      rating: 4.9,
      reviewCount: 78,
      inStock: true,
      isFeatured: true,
    },
    {
      _id: "7",
      title: "Denso A/C Compressor",
      brand: "Denso",
      images: [
        "https://images.unsplash.com/photo-1552975383-513c7002d408?w=400&q=80",
      ],
      publicPrice: 329.99,
      wholesalePrice: 269.0,
      rating: 4.5,
      reviewCount: 67,
      inStock: true,
      isFeatured: true,
    },
    {
      _id: "8",
      title: "TRW Brake Pad Set",
      brand: "TRW",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      ],
      publicPrice: 79.99,
      wholesalePrice: 59.0,
      rating: 4.6,
      reviewCount: 198,
      inStock: true,
      isFeatured: true,
    },
  ]);

  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { addToCart } = useCart();

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Featured Products
            </h2>
            <p className="mt-2 text-lg text-slate-600">
              Handpicked parts for your vehicle
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-5 h-5 text-slate-700" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

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

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Link
      href={`/products/${product.id || product._id}`}
      className="flex-shrink-0 w-72 group"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={
              product.images?.[0] ||
              "https://via.placeholder.com/300x300?text=No+Image"
            }
            alt={product.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />

          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
              Featured
            </span>
          </div>

          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
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

        <div className="p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">
            {product.brand}
          </p>

          <h3 className="mt-1 text-base font-semibold text-slate-900 line-clamp-2 group-hover:text-red-600 transition-colors">
            {product.title}
          </h3>

          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="ml-2 text-xs text-slate-500">
              ({product.reviewCount || 0})
            </span>
          </div>

          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-slate-900">
                ${product.publicPrice?.toFixed(2)}
              </span>
              <span className="text-sm text-slate-500 line-through">
                ${Number(product.publicPrice * 1.2).toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                Wholesale: ${product.wholesalePrice?.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding || !product.inStock}
            className={`mt-4 w-full py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all ${
              product.inStock
                ? "bg-slate-900 text-white hover:bg-red-600"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  );
}
