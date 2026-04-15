/**
 * Navbar Component
 * Main navigation with search, cart, user menu, and mobile responsive design
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useCart } from "@/context/CartContext";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const categories = [
  { id: "all", name: "All Categories" },
  { id: "engine", name: "Engine Parts" },
  { id: "brakes", name: "Brakes & Suspension" },
  { id: "electrical", name: "Electrical & Lights" },
  { id: "transmission", name: "Transmission" },
  { id: "body", name: "Body Parts" },
  { id: "interior", name: "Interior" },
  { id: "wheels", name: "Wheels & Tires" },
  { id: "oils", name: "Oils & Fluids" },
  { id: "accessories", name: "Accessories" },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const handleLogout = () => dispatch(logout());
  const { itemCount } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const query = encodeURIComponent(searchQuery);
      const category =
        selectedCategory !== "all" ? `&category=${selectedCategory}` : "";
      window.location.href = `/search?q=${query}${category}`;
    }
  };

  const isGarageOrShop = user?.role === "garage" || user?.role === "shop";

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">
                GearBazar
              </span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="flex w-full">
              <div className="relative flex-1">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="absolute left-0 top-0 bottom-0 pl-3 pr-2 bg-gray-100 border-r border-gray-300 rounded-l-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search auto parts..."
                  className="w-full pl-40 pr-4 py-2.5 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-primary-600 text-white font-medium rounded-r-lg hover:bg-primary-700 transition-colors"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {!loading && (
              <>
                {!user ? (
                  <>
                    <Link
                      href="/login"
                      className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                    >
                      Login / Register
                    </Link>
                    <Link
                      href="/register"
                      className="px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Become a Seller
                    </Link>
                  </>
                ) : isGarageOrShop ? (
                  <>
                    <Link
                      href="/dashboard/wholesale"
                      className="flex items-center text-gray-700 hover:text-primary-600 font-medium transition-colors"
                    >
                      <ClipboardDocumentListIcon className="h-5 w-5 mr-1" />
                      Wholesale Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center text-gray-700 hover:text-primary-600 font-medium transition-colors"
                    >
                      <UserIcon className="h-5 w-5 mr-1" />
                      Profile
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/profile"
                    className="flex items-center text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  >
                    <UserIcon className="h-5 w-5 mr-1" />
                    Profile
                  </Link>
                )}
              </>
            )}

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-2">
            {/* Mobile Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-primary-600"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="flex">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-100 border-r border-gray-300 px-2 py-2 text-sm text-gray-700 rounded-l-lg"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="flex-1 px-3 py-2 border-y border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-r-lg"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ${isOpen ? "max-h-screen" : "max-h-0 overflow-hidden"}`}
      >
        <div className="bg-gray-50 border-t">
          {!loading && (
            <div className="px-4 py-3 space-y-3">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    className="block py-2 text-gray-700 font-medium hover:text-primary-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Login / Register
                  </Link>
                  <Link
                    href="/register"
                    className="block py-2 text-gray-700 font-medium hover:text-primary-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Become a Seller
                  </Link>
                </>
              ) : (
                <>
                  {isGarageOrShop && (
                    <Link
                      href="/dashboard/wholesale"
                      className="block py-2 text-gray-700 font-medium hover:text-primary-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Wholesale Dashboard
                    </Link>
                  )}
                  <Link
                    href="/profile"
                    className="block py-2 text-gray-700 font-medium hover:text-primary-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left py-2 text-gray-700 font-medium hover:text-primary-600"
                  >
                    <span className="flex items-center">
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                      Logout
                    </span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
