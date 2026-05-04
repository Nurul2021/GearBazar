"use client";

import dynamic from "next/dynamic";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const AddNewPartForm = dynamic(
  () => import("@/components/dashboard/AddNewPartForm"),
  { ssr: false },
);

export default function AddProductPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-4">
      {/* Minimal Header */}
      <Link
        href="/dashboard/products"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      {/* Form */}
      <AddNewPartForm />
    </div>
  );
}
