"use client";

/**
 * Products Page
 * Displays all products with filtering, sorting, and search functionality
 */

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { useSelector } from "react-redux";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useSelector((state) => state.auth);

  // Filter state from URL
  const category = searchParams.get("category") || "";
  const brand = searchParams.get("brand") || "";
  const productType = searchParams.get("productType") || "";
  const make = searchParams.get("make") || "";
  const model = searchParams.get("model") || "";
  const year = searchParams.get("year") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);

  // Dynamic price based on role
  const getProductPrice = (product) => {
    if (user?.role === "garage_owner")
      return product.garagePrice || product.wholesalePrice;
    if (user?.role === "seller") return product.wholesalePrice;
    return product.publicPrice || product.price;
  };

  const handleWishlistToggle = (productId, isWishlisted) => {
    console.log("Wishlist toggle:", productId, isWishlisted);
  };

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams],
  );

  const updateURL = (name, value) => {
    router.push(pathname + "?" + createQueryString(name, value));
  };

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/products?limit=24`;

      // Build query
      if (category) url += `&category=${encodeURIComponent(category)}`;
      if (brand) url += `&brand=${encodeURIComponent(brand)}`;
      if (productType) url += `&productType=${encodeURIComponent(productType)}`;
      if (make) url += `&make=${encodeURIComponent(make)}`;
      if (model) url += `&model=${encodeURIComponent(model)}`;
      if (year) url += `&year=${year}`;

      const res = await axios.get(url);
      setProducts(res.data.data.products || dummyProducts);
    } catch (error) {
      console.error("Failed to fetch products");
      setProducts(dummyProducts);
    } finally {
      setLoading(false);
    }
  };

  const dummyProducts = [
    {
      _id: "1",
      title: "Brembo Brake Pad Set",
      brand: "Brembo",
      publicPrice: 89.99,
      wholesalePrice: 65.0,
      garagePrice: 60.0,
      discount: 15,
      rating: 4.5,
      reviewCount: 128,
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      ],
      inStock: true,
      isNew: false,
      category: "Brakes",
      compatibilities: [
        { make: "Toyota", model: "Camry", year: "2020" },
        { make: "Honda", model: "Accord", year: "2021" },
      ],
    },
    {
      _id: "2",
      title: "NGK Spark Plugs (4 Pack)",
      brand: "NGK",
      publicPrice: 24.99,
      wholesalePrice: 19.99,
      discount: 0,
      rating: 4.8,
      reviewCount: 256,
      images: [
        "https://images.unsplash.com/photo-1552975383-513c7002d408?w=400&q=80",
      ],
      inStock: true,
      isNew: true,
      category: "Engine",
    },
    {
      _id: "3",
      title: "Mobil 1 Synthetic Oil 5W-30",
      brand: "Mobil",
      publicPrice: 42.99,
      wholesalePrice: 35.0,
      garagePrice: 32.0,
      discount: 10,
      rating: 4.7,
      reviewCount: 89,
      images: [
        "https://images.unsplash.com/photo-1506368242239-9d49a5466f7a?w=400&q=80",
      ],
      inStock: true,
      isNew: false,
      category: "Oils",
    },
    // Add more dummy products for testing
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:w-80 lg:flex-shrink-0">
            <div className="bg-white shadow-2xl rounded-3xl p-8 sticky top-24">
              {/* Category Filter */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">
                  Category
                </label>
                <div className="space-y-2">
                  {[
                    "All",
                    "Engine",
                    "Brakes",
                    "Electrical",
                    "Transmission",
                    "Suspension",
                  ].map((cat) => (
                    <button
                      key={cat}
                      className={`w-full p-4 rounded-2xl transition-all shadow-sm ${
                        category === (cat === "All" ? "" : cat.toLowerCase())
                          ? "bg-primary-600 text-white shadow-lg"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                      }`}
                      onClick={() =>
                        updateURL(
                          "category",
                          cat === "All" ? "" : cat.toLowerCase(),
                        )
                      }
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">
                  Brand
                </label>
                <div className="space-y-2">
                  {[
                    "All",
                    "Brembo",
                    "NGK",
                    "Mobil",
                    "Bosch",
                    "Mann-Filter",
                  ].map((brandName) => (
                    <button
                      key={brandName}
                      className={`w-full p-4 rounded-2xl transition-all shadow-sm ${
                        brand ===
                        (brandName === "All" ? "" : brandName.toLowerCase())
                          ? "bg-primary-600 text-white shadow-lg"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                      }`}
                      onClick={() =>
                        updateURL(
                          "brand",
                          brandName === "All" ? "" : brandName.toLowerCase(),
                        )
                      }
                    >
                      {brandName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Type Filter */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">
                  Product Type
                </label>
                <div className="space-y-2">
                  {["All", "New", "Recondition"].map((type) => (
                    <button
                      key={type}
                      className={`w-full p-4 rounded-2xl transition-all shadow-sm ${
                        productType ===
                        (type === "All" ? "" : type.toLowerCase())
                          ? "bg-primary-600 text-white shadow-lg"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                      }`}
                      onClick={() =>
                        updateURL(
                          "productType",
                          type === "All" ? "" : type.toLowerCase(),
                        )
                      }
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vehicle Compatibility */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">
                  Vehicle Compatibility
                </label>
                <div className="space-y-3">
                  <select
                    value={make}
                    onChange={(e) => updateURL("make", e.target.value)}
                    className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 shadow-sm"
                  >
                    <option value="">Any Make</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="Ford">Ford</option>
                    <option value="BMW">BMW</option>
                  </select>
                  <select
                    value={model}
                    onChange={(e) => updateURL("model", e.target.value)}
                    className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 shadow-sm"
                  >
                    <option value="">Any Model</option>
                    <option value="Camry">Camry</option>
                    <option value="Accord">Accord</option>
                    <option value="F-150">F-150</option>
                    <option value="3 Series">3 Series</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => updateURL("year", e.target.value)}
                    className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 shadow-sm"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {products.length} Products Found
                </h2>
                <p className="text-slate-600">Filtered by your selections</p>
              </div>
            </div>

            {loading ? (
              <ProductGridSkeleton count={12} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={{
                      ...product,
                      price: getProductPrice(product),
                    }}
                    onWishlistToggle={handleWishlistToggle}
                  />
                ))}
              </div>
            )}

            {products.length === 0 && !loading && (
              <div className="text-center py-32">
                <div className="w-32 h-32 mx-auto mb-12 bg-slate-100 rounded-3xl flex items-center justify-center">
                  <Search className="w-16 h-16 text-slate-400" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-6">
                  No products found
                </h3>
                <p className="text-xl text-slate-600 mb-12 max-w-md mx-auto">
                  Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={() => {
                    router.push("/products");
                  }}
                  className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-8">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
