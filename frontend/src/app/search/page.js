/**
 * Search Page
 * Full-text search with suggestions and results display
 */

"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "../../components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronRight, Clock, Star } from "lucide-react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const popularCategories = [
    {
      name: "Engine Parts",
      href: "/products?category=engine",
      image: "/api/placeholder/200/200/FF6B6B/FFFFFF?text=Engine",
    },
    {
      name: "Brake Systems",
      href: "/products?category=brakes",
      image: "/api/placeholder/200/200/4F46E5/FFFFFF?text=Brakes",
    },
    {
      name: "Suspension",
      href: "/products?category=suspension",
      image: "/api/placeholder/200/200/10B981/FFFFFF?text=Suspension",
    },
    {
      name: "Electrical",
      href: "/products?category=electrical",
      image: "/api/placeholder/200/200/F59E0B/FFFFFF?text=Electrical",
    },
  ];

  const fetchSearch = useCallback(async (q) => {
    if (!q) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `${API_URL}/products/search?q=${encodeURIComponent(q)}&limit=12`,
      );
      setSearchResults(res.data.data || []);
    } catch (error) {
      console.error("Search failed");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSuggestions = useCallback(async (q) => {
    if (!q) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await axios.get(
        `${API_URL}/products/suggest?q=${encodeURIComponent(q)}&limit=5`,
      );
      setSuggestions(res.data.data || []);
    } catch (error) {
      setSuggestions(dummySuggestions);
    }
  }, []);

  useEffect(() => {
    fetchSearch(query);
  }, [query, fetchSearch]);

  useEffect(() => {
    fetchSuggestions(query);
  }, [query, fetchSuggestions]);

  // Dummy recently viewed from localStorage simulation
  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    setRecentlyViewed(viewed.slice(0, 4));
  }, []);

  if (!query && !showSuggestions) {
    return <div>No search query</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar with Suggestions */}
        <div className="text-center mb-16">
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setShowSuggestions(true);
                  // Update URL
                  router.push(`/search?q=${e.target.value}`);
                }}
                placeholder="Search for brake pads, oil filters, spark plugs..."
                className="w-full pl-16 pr-12 py-6 text-2xl border-2 border-slate-300 rounded-3xl shadow-xl focus:ring-4 focus:ring-primary-500 focus:border-primary-400 focus:outline-none placeholder-slate-500 font-semibold bg-white"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-200 rounded-2xl transition-colors">
                <ChevronRight className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-2xl rounded-3xl border border-slate-200/50 backdrop-blur-xl z-50 max-h-96 overflow-y-auto">
                {suggestions.map((suggestion) => (
                  <Link
                    key={suggestion._id}
                    href={`/products/${suggestion._id}`}
                    className="flex items-center gap-4 p-6 hover:bg-slate-50 rounded-2xl transition-all first:rounded-t-3xl last:rounded-b-3xl group"
                  >
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow">
                      <Image
                        src={
                          suggestion.images[0] ||
                          "/api/placeholder/80/80/FF6B6B/FFFFFF"
                        }
                        alt={suggestion.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 text-lg mb-1 truncate">
                        {suggestion.title}
                      </h4>
                      <p className="text-sm text-slate-600 mb-2 truncate">
                        {suggestion.brand}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-yellow-400 fill-yellow-400"
                            />
                          ))}
                        </div>
                        <span className="text-sm text-slate-600">
                          ({suggestion.reviewCount || 0})
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-xl text-slate-900">
                        ${(suggestion.price || 0).toFixed(0)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {query ? (
            <>
              {/* Search Results */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    {loading
                      ? "Searching..."
                      : `${searchResults.length} Results for`}
                  </h2>
                  <span className="text-2xl font-bold text-slate-900">
                    "{query}"
                  </span>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-20">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="animate-pulse bg-white rounded-2xl p-6 shadow-lg h-80"
                      >
                        <div className="h-48 bg-slate-200 rounded-xl mb-4"></div>
                        <div className="h-6 bg-slate-200 rounded-full mb-2"></div>
                        <div className="h-5 bg-slate-200 rounded-full w-3/4"></div>
                        <div className="h-12 bg-slate-200 rounded-xl mt-4"></div>
                      </div>
                    ))}
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {searchResults.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                ) : (
                  // No Results Found
                  <div className="text-center py-32">
                    <div className="w-40 h-40 mx-auto mb-12 bg-slate-200 rounded-3xl flex items-center justify-center shadow-2xl">
                      <Search className="w-20 h-20 text-slate-500" />
                    </div>
                    <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-500 bg-clip-text text-transparent mb-8">
                      No Results Found
                    </h2>
                    <p className="text-2xl text-slate-600 mb-16 max-w-2xl mx-auto leading-relaxed">
                      We couldn&apos;t find any auto parts matching "
                      <span className="font-bold text-slate-900">{query}</span>"
                    </p>

                    {/* Popular Suggestions */}
                    <div className="max-w-4xl mx-auto">
                      <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">
                        Try These Popular Categories
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {popularCategories.map((cat) => (
                          <Link
                            key={cat.name}
                            href={cat.href}
                            className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border hover:border-primary-200"
                          >
                            <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 group-hover:scale-105 transition-transform">
                              <Image
                                src={cat.image}
                                alt={cat.name}
                                width={400}
                                height={192}
                                className="w-full h-full object-cover group-hover:brightness-110"
                              />
                            </div>
                            <h4 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                              {cat.name}
                            </h4>
                            <p className="text-slate-600 group-hover:text-slate-700">
                              Most popular parts
                            </p>
                            <div className="flex items-center gap-2 mt-4 text-sm font-semibold text-primary-600">
                              Shop Now
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Recently Viewed */}
              {recentlyViewed.length > 0 && (
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-12 flex items-center gap-4">
                    Recently Viewed
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {recentlyViewed.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Live Search Suggestions */}
              <div className="relative">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-12 text-center">
                    {showSuggestions ? "Quick Suggestions" : "Popular Searches"}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {suggestions.map((suggestion) => (
                      <Link
                        key={suggestion._id}
                        href={`/products/${suggestion._id}`}
                        className="group bg-white shadow-xl rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden h-64 flex flex-col"
                      >
                        <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 group-hover:scale-105 transition-transform">
                          <Image
                            src={
                              suggestion.images?.[0] ||
                              "/api/placeholder/400/320/FF6B6B/FFFFFF"
                            }
                            alt={suggestion.title}
                            width={400}
                            height={320}
                            className="w-full h-full object-cover group-hover:brightness-90"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="mb-4">
                            <h4 className="font-bold text-xl text-slate-900 mb-2 line-clamp-2 leading-tight">
                              {suggestion.title}
                            </h4>
                            <p className="text-slate-600 text-lg mb-2">
                              {suggestion.brand}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-slate-900">
                              ${(suggestion.price || 0).toFixed(0)}
                            </span>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                              <span className="font-semibold">4.8</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const dummySuggestions = [
  {
    _id: "1",
    title: "Brembo Brake Pads",
    brand: "Brembo",
    price: 89.99,
    images: ["/api/placeholder/400/320/FF6B6B/FFFFFF"],
  },
  {
    _id: "2",
    title: "NGK Spark Plugs",
    brand: "NGK",
    price: 24.99,
    images: ["/api/placeholder/400/320/4F46E5/FFFFFF"],
  },
  {
    _id: "3",
    title: "Mobil 1 Oil 5W-30",
    brand: "Mobil",
    price: 42.99,
    images: ["/api/placeholder/400/320/10B981/FFFFFF"],
  },
];

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-8">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
