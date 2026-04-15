/**
 * Print Button Component
 * Triggers browser print dialog with @media print styles
 */

"use client";

import { Printer } from "lucide-react";

export function PrintButton({ onClick, className = "", children }) {
  const handlePrint = () => {
    if (onClick) {
      onClick();
    }
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className={`inline-flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors ${className}`}
    >
      <Printer className="w-4 h-4 mr-2" />
      {children || "Print This Page"}
    </button>
  );
}

export default PrintButton;
