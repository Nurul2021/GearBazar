"use client";

/**
 * Admin Login Page
 * Separate login for administrators only
 */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import axios from "axios";
import { setUser } from "../../features/auth/authSlice";

export default function AdminLoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    setLocalLoading(true);
    setError("");

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

      console.log("Attempting login to:", `${API_URL}/auth/admin-login`);

      const { data } = await axios.post(
        `${API_URL}/auth/admin-login`,
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );

      console.log("Login response:", data);

      if (data.success) {
        const token = data.data.token;
        const userData = data.data.user;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));

        dispatch(setUser(userData));

        console.log("Admin login success:", userData.role);
        window.location.href = "/admin";
      }
    } catch (err) {
      console.error("Login error:", err.response || err.message);
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-500">GearBazar Administration</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Admin Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="admin@gearbazar.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                {...register("password", {
                  required: "Password is required",
                })}
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full pr-12 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={localLoading || loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center"
          >
            {localLoading || loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.3"
                  />
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                    opacity="0.8"
                  />
                </svg>
                Signing in...
              </>
            ) : (
              "Admin Sign In"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Back to customer login
          </Link>
        </div>
      </div>
    </div>
  );
}
