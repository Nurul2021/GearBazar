"use client";

/**
 * Login Page
 * Handles user authentication with email/password
 */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, forgotPassword } from "@/features/auth/authSlice";
import Link from "next/link";
import Image from "next/image";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotLoading, setForgotLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ email, password }) => {
    dispatch(loginUser({ email, password, remember: rememberMe }));
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) return;
    setForgotLoading(true);
    await dispatch(forgotPassword({ email: forgotEmail }));
    setForgotLoading(false);
    setShowForgotModal(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Side Image */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-slate-900 to-slate-700 items-center justify-center p-12">
        <div className="text-white text-center max-w-md">
          <Image
            src="/api/placeholder/400/300"
            width={400}
            height={300}
            alt="Auto parts"
            className="mx-auto mb-8 rounded-2xl shadow-2xl"
          />
          <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
          <p className="text-slate-300">
            Access your wholesale dashboard and manage orders.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Sign In</h1>
            <p className="text-slate-600">Welcome back to GearBazar</p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email
              </label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
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
                  className="w-full pr-12 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-slate-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-slate-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded"
                />
                <span className="ml-2 text-sm text-slate-700">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
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
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">
                  Or continue with
                </span>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Forgot Password
              </h2>
              <button
                onClick={() => setShowForgotModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-slate-600 mb-6">
              Enter your email and we'll send you a link to reset your password.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleForgotPassword();
              }}
              className="space-y-4"
            >
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500"
                required
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl hover:bg-slate-200 transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={forgotLoading}
                  className="flex-1 bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800 transition-all font-medium flex items-center justify-center disabled:opacity-50"
                >
                  {forgotLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
