/**
 * Modal Component
 * Accessible modal dialog with backdrop, close functionality, and sizes
 */

"use client";

import { forwardRef, useEffect, createPortal } from "react";
import { X } from "lucide-react";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

const Modal = forwardRef(
  (
    { isOpen, onClose, title, children, size = "md", className = "", ...props },
    ref,
  ) => {
    useLockBodyScroll(isOpen);

    useEffect(() => {
      const handleEsc = (e) => {
        if (e.key === "Escape") onClose();
      };
      if (isOpen) {
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
      }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizes = {
      sm: "max-w-md",
      md: "max-w-2xl",
      lg: "max-w-4xl",
      xl: "max-w-6xl",
    };

    return createPortal(
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:data-[side=center]:fade-out-0"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-8">
          <div
            ref={ref}
            className={`bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-slate-900/10 dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 w-full ${sizes[size]} max-h-[90vh] overflow-y-auto data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:data-[side=center]:fade-out-0 ${className}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            {...props}
          >
            {/* Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50 p-6 pb-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-t-3xl">
              {title && (
                <h3
                  id="modal-title"
                  className="text-2xl font-bold text-slate-900 dark:text-slate-100"
                >
                  {title}
                </h3>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors group"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8">{children}</div>
          </div>
        </div>
      </>,
      document.body,
    );
  },
);

Modal.displayName = "Modal";

export default Modal;
