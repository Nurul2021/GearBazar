/**
 * Input Component
 * Reusable input with floating labels, icons, password toggle, and error states
 */

import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = forwardRef(
  (
    {
      type = "text",
      label,
      iconLeft,
      iconRight,
      error,
      floatingLabel = false,
      className = "",
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const baseStyles = `w-full px-5 py-4 border rounded-3xl shadow-sm focus:outline-none focus:ring-4 focus:ring-offset-2 transition-all duration-200 placeholder-slate-500 font-medium text-slate-900 bg-white/80 backdrop-blur-sm`;

    const sizes = "text-base leading-6 h-16 min-h-[64px]";

    const focusStyles = error
      ? "focus:ring-red-400 border-red-300 focus:border-red-400"
      : "focus:ring-navy-500 border-slate-300 focus:border-navy-500";

    const inputClass = `${baseStyles} ${sizes} ${focusStyles} ${className}`;

    const handlePasswordToggle = () => setShowPassword(!showPassword);

    const rightIcon =
      iconRight ||
      (type === "password" && (
        <button
          type="button"
          onClick={handlePasswordToggle}
          className="p-2 hover:bg-slate-100 rounded-2xl transition-colors"
          tabIndex={-1}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-slate-500" />
          ) : (
            <Eye className="h-5 w-5 text-slate-500" />
          )}
        </button>
      ));

    return (
      <div className="space-y-2 w-full">
        {label && (
          <label
            className={`block font-bold ${floatingLabel ? "absolute -top-3 left-4 px-2 bg-white text-sm text-slate-700" : "text-lg text-slate-900 mb-3"}`}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {iconLeft && (
            <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
              {iconLeft}
            </div>
          )}
          <input
            ref={ref}
            type={type === "password" && showPassword ? "text" : type}
            className={inputClass}
            aria-invalid={!!error}
            aria-describedby={error ? "error-message" : undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-auto">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p
            id="error-message"
            className="text-sm font-medium text-red-600 flex items-center gap-2 mt-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
