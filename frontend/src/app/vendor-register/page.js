"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  StorefrontIcon,
  ClipboardDocumentListIcon,
  UserIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { Upload } from "lucide-react";

const STEPS = [
  { id: 1, title: "Basic Info", icon: UserIcon },
  { id: 2, title: "Business Info", icon: BuildingStorefrontIcon },
  { id: 3, title: "KYC Documents", icon: ClipboardDocumentListIcon },
];

const BUSINESS_TYPES = [
  { value: "retail_shop", label: "Retail Shop" },
  { value: "wholesale", label: "Wholesale Dealer" },
  { value: "garage", label: "Garage/Repair Shop" },
  { value: "showroom", label: "Showroom" },
  { value: "service_center", label: "Service Center" },
];

const EXPERIENCE_OPTIONS = [
  { value: "0-1", label: "Less than 1 year" },
  { value: "1-3", label: "1-3 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "5-10", label: "5-10 years" },
  { value: "10+", label: "10+ years" },
];

export default function VendorRegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    shopName: "",
    address: "",
    businessType: "",
    experience: "",
    tradeLicense: null,
    tradeLicensePreview: null,
    nid: null,
    nidPreview: null,
    shopFront: null,
    shopFrontPreview: null,
  });

  const [errors, setErrors] = useState({});

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Invalid email format";
      if (!formData.phone.trim()) newErrors.phone = "Phone is required";
      else if (!/^[\d\s\-+()]{10,}$/.test(formData.phone))
        newErrors.phone = "Invalid phone format";
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters";
    }

    if (step === 2) {
      if (!formData.shopName.trim())
        newErrors.shopName = "Shop name is required";
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.businessType)
        newErrors.businessType = "Business type is required";
      if (!formData.experience) newErrors.experience = "Experience is required";
    }

    if (step === 3) {
      if (!formData.tradeLicense)
        newErrors.tradeLicense = "Trade License is required";
      if (!formData.nid) newErrors.nid = "NID is required";
      if (!formData.shopFront)
        newErrors.shopFront = "Shop front image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        [field]: file,
        [`${field}Preview`]: preview,
      }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: null }));
      }
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-12 max-w-lg w-full text-center"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Application Submitted!
          </h2>
          <p className="text-slate-600 mb-8">
            Your application is under review. Our team will verify your
            documents and contact you within 24-48 hours.
          </p>
          <div className="bg-slate-50 rounded-2xl p-6 mb-8">
            <p className="text-sm text-slate-500 mb-2">Application Reference</p>
            <p className="text-2xl font-bold text-slate-900">
              GB-VENDOR-
              {Math.random().toString(36).substring(2, 8).toUpperCase()}
            </p>
          </div>
          <Link
            href="/"
            className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-8 rounded-xl transition-all"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-slate-900">GearBazar</h1>
          </Link>
          <p className="text-slate-600 mt-2">Vendor Registration</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-red-600 text-white"
                          : isCompleted
                            ? "bg-green-500 text-white"
                            : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircleIcon className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <span
                      className={`text-xs mt-2 font-medium ${
                        isActive ? "text-red-600" : "text-slate-500"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`w-16 sm:w-24 h-1 mx-2 rounded ${
                        isCompleted ? "bg-green-500" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <h3 className="text-xl font-semibold text-slate-900 mb-6">
                    Basic Information
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                        errors.name ? "border-red-500" : "border-slate-300"
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                        errors.email ? "border-red-500" : "border-slate-300"
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                        errors.phone ? "border-red-500" : "border-slate-300"
                      }`}
                      placeholder="+880 1XXXXXXXXX"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                          errors.password
                            ? "border-red-500"
                            : "border-slate-300"
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
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
                        {errors.password}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <h3 className="text-xl font-semibold text-slate-900 mb-6">
                    Business Information
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Shop/Garage Name *
                    </label>
                    <input
                      type="text"
                      name="shopName"
                      value={formData.shopName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                        errors.shopName ? "border-red-500" : "border-slate-300"
                      }`}
                      placeholder="Your shop name"
                    />
                    {errors.shopName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.shopName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Business Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                        errors.address ? "border-red-500" : "border-slate-300"
                      }`}
                      placeholder="Full business address"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Business Type *
                    </label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                        errors.businessType
                          ? "border-red-500"
                          : "border-slate-300"
                      }`}
                    >
                      <option value="">Select business type</option>
                      {BUSINESS_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {errors.businessType && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.businessType}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Years of Experience *
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                        errors.experience
                          ? "border-red-500"
                          : "border-slate-300"
                      }`}
                    >
                      <option value="">Select experience</option>
                      {EXPERIENCE_OPTIONS.map((exp) => (
                        <option key={exp.value} value={exp.value}>
                          {exp.label}
                        </option>
                      ))}
                    </select>
                    {errors.experience && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.experience}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold text-slate-900 mb-6">
                    KYC Documents
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Please upload clear images of your documents for
                    verification. Accepted formats: JPG, PNG, PDF (Max 5MB each)
                  </p>

                  {[
                    {
                      field: "tradeLicense",
                      label: "Trade License *",
                      desc: "Upload your valid trade license",
                    },
                    {
                      field: "nid",
                      label: "National ID (NID) *",
                      desc: "Upload your national identification card",
                    },
                    {
                      field: "shopFront",
                      label: "Shop Front Image *",
                      desc: "Upload a photo of your shop front",
                    },
                  ].map(({ field, label, desc }) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {label}
                      </label>
                      <div
                        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                          errors[field]
                            ? "border-red-500 bg-red-50"
                            : formData[field]
                              ? "border-green-500 bg-green-50"
                              : "border-slate-300 hover:border-red-400"
                        }`}
                      >
                        {formData[field] ? (
                          <div className="space-y-3">
                            {field === "shopFront" ||
                            (field === "tradeLicense" &&
                              formData[`${field}Preview`]?.startsWith(
                                "blob:",
                              )) ? (
                              <img
                                src={formData[`${field}Preview`]}
                                alt={label}
                                className="max-h-32 mx-auto rounded-lg"
                              />
                            ) : (
                              <div className="flex items-center justify-center gap-2 text-green-600">
                                <CheckCircleIcon className="w-8 h-8" />
                                <span className="font-medium">
                                  {formData[field]?.name}
                                </span>
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  [field]: null,
                                  [`${field}Preview`]: null,
                                }))
                              }
                              className="text-sm text-red-600 hover:text-red-700"
                            >
                              Remove and upload different file
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer">
                            <Upload className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                            <p className="text-sm text-slate-600">{desc}</p>
                            <p className="text-xs text-slate-400 mt-1">
                              Click to upload or drag and drop
                            </p>
                            <input
                              type="file"
                              accept="image/*,.pdf"
                              onChange={(e) => handleFileChange(e, field)}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                      {errors[field] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors[field]}
                        </p>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-6 py-3 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <ChevronLeftIcon className="w-5 h-5 mr-2" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors"
                >
                  Next
                  <ChevronRightIcon className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ChevronRightIcon className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-red-600 hover:text-red-500 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
