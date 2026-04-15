/**
 * Button Component
 * Reusable button with variants, sizes, loading state, and icons
 */

import { forwardRef, cloneElement } from "react";
import { Loader2 } from "lucide-react";

const Button = forwardRef(
  (
    {
      variant = "primary",
      size = "md",
      children,
      className = "",
      loading = false,
      disabled = false,
      iconLeft,
      iconRight,
      ...props
    },
    ref,
  ) => {
    const baseStyles = `inline-flex items-center justify-center font-bold focus:outline-none focus:ring-4 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:pointer-events-none`;

    const variants = {
      primary:
        "bg-navy-500 hover:bg-navy-600 text-white shadow-lg hover:shadow-xl focus:ring-navy-500 border-navy-600",
      secondary:
        "bg-rust-500 hover:bg-rust-600 text-white shadow-lg hover:shadow-xl focus:ring-rust-500 border-rust-600",
      outline:
        "border-2 border-navy-500 hover:border-navy-600 text-navy-500 hover:text-navy-600 hover:bg-navy-50 focus:ring-navy-500 shadow-sm",
      danger:
        "bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl focus:ring-red-500 border-red-600",
      ghost:
        "text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-400",
    };

    const sizes = {
      sm: "px-4 py-2.5 text-sm rounded-2xl h-11 min-h-[44px]",
      md: "px-8 py-4 text-lg rounded-3xl h-14 min-h-[56px]",
      lg: "px-12 py-6 text-xl rounded-[2.5rem] h-20 min-h-[80px]",
    };

    const loader = <Loader2 className="mr-2 h-4 w-4 animate-spin" />;

    const leftIcon =
      iconLeft &&
      !loading &&
      cloneElement(iconLeft, {
        className: `mr-3 h-5 w-5 ${iconLeft.props.className}`,
      });
    const rightIcon =
      iconRight &&
      !loading &&
      cloneElement(iconRight, {
        className: `ml-3 h-5 w-5 ${iconRight.props.className}`,
      });

    const content = loading ? (
      <>
        {loader}
        {children || "Loading..."}
      </>
    ) : (
      <>
        {leftIcon}
        {children}
        {rightIcon}
      </>
    );

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={loading || disabled}
        aria-disabled={loading || disabled}
        aria-label={
          props["aria-label"] ||
          (typeof children === "string" ? children : "button")
        }
        {...props}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
