/**
 * Confirmation Dialog
 * Modal for dangerous actions like delete, reject verification
 */

"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { createPortal } from "react-dom";

const ConfirmationContext = createContext(null);

export function ConfirmationProvider({ children }) {
  const [dialog, setDialog] = useState(null);

  const confirm = (options) => {
    return new Promise((resolve) => {
      setDialog({
        ...options,
        onConfirm: () => {
          resolve(true);
          setDialog(null);
        },
        onCancel: () => {
          resolve(false);
          setDialog(null);
        },
      });
    });
  };

  return (
    <ConfirmationContext.Provider value={{ confirm }}>
      {children}
      {dialog && <ConfirmationDialog {...dialog} />}
    </ConfirmationContext.Provider>
  );
}

export function useConfirmation() {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error("useConfirmation must be used within ConfirmationProvider");
  }
  return context;
}

function ConfirmationDialog({
  isOpen = true,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger", // 'danger', 'warning', 'info'
  icon,
  onConfirm,
  onCancel,
  loading = false,
  checkboxLabel,
  checkboxRequired = false,
}) {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleConfirm = () => {
    if (checkboxRequired && !checkboxChecked) return;
    onConfirm?.();
  };

  const typeStyles = {
    danger: {
      icon: "⚠️",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      buttonBg: "bg-red-600 hover:bg-red-700",
      borderColor: "border-red-200",
    },
    warning: {
      icon: "⚡",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      buttonBg: "bg-amber-500 hover:bg-amber-600",
      borderColor: "border-amber-200",
    },
    info: {
      icon: "ℹ️",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      buttonBg: "bg-blue-600 hover:bg-blue-700",
      borderColor: "border-blue-200",
    },
    success: {
      icon: "✅",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      buttonBg: "bg-green-600 hover:bg-green-700",
      borderColor: "border-green-200",
    },
  };

  const styles = typeStyles[type] || typeStyles.danger;

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={!loading ? onCancel : undefined}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 animate-scale-in border-2 border-slate-100">
        {/* Icon */}
        <div
          className={`w-14 h-14 ${styles.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}
        >
          <span className="text-2xl">{icon || styles.icon}</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-slate-900 text-center mb-2">
          {title}
        </h2>

        {/* Message */}
        <p className="text-slate-600 text-center mb-6">{message}</p>

        {/* Checkbox (optional) */}
        {checkboxLabel && (
          <label className="flex items-center gap-3 mb-6 p-3 bg-slate-50 rounded-xl cursor-pointer">
            <input
              type="checkbox"
              checked={checkboxChecked}
              onChange={(e) => setCheckboxChecked(e.target.checked)}
              className="w-5 h-5 text-red-600 rounded focus:ring-red-500 border-slate-300"
            />
            <span className="text-sm text-slate-700">{checkboxLabel}</span>
          </label>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading || (checkboxRequired && !checkboxChecked)}
            className={`flex-1 px-4 py-3 ${styles.buttonBg} text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Processing...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/**
 * Pre-built confirmation dialogs for common actions
 */
export const ConfirmationDialogs = {
  delete: (options) => (
    <ConfirmationDialog
      type="danger"
      title="Delete Item"
      message="This action cannot be undone. The item will be permanently removed."
      confirmText="Delete"
      cancelText="Cancel"
      checkboxLabel="I understand this is permanent"
      checkboxRequired
      {...options}
    />
  ),

  rejectVerification: (options) => (
    <ConfirmationDialog
      type="danger"
      title="Reject Verification"
      message="This user will be notified that their verification has been rejected."
      confirmText="Reject"
      cancelText="Cancel"
      {...options}
    />
  ),

  cancelOrder: (options) => (
    <ConfirmationDialog
      type="warning"
      title="Cancel Order"
      message="Are you sure you want to cancel this order? This action cannot be undone."
      confirmText="Yes, Cancel Order"
      cancelText="Keep Order"
      {...options}
    />
  ),

  logout: (options) => (
    <ConfirmationDialog
      type="info"
      title="Log Out"
      message="Are you sure you want to log out?"
      confirmText="Log Out"
      cancelText="Stay Logged In"
      {...options}
    />
  ),

  clearCart: (options) => (
    <ConfirmationDialog
      type="warning"
      title="Clear Cart"
      message="Remove all items from your cart? This cannot be undone."
      confirmText="Clear Cart"
      cancelText="Keep Items"
      {...options}
    />
  ),
};

export default ConfirmationDialog;
