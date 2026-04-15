import { forwardRef } from 'react';
import { ShieldCheck, Clock, Package, AlertCircle } from 'lucide-react';

const Badge = forwardRef(({ 
  variant = 'default', 
  size = 'md',
  children,
  className = '',
  icon,
  ...props 
}, ref) => {
  const baseStyles = 'inline-flex items-center gap-2 font-bold uppercase tracking-wide shadow-lg select-none pointer-events-auto';

  const variants = {
    stock: 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200 focus:ring-emerald-500',
    outOfStock: 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200 focus:ring-slate-500',
    verified: 'bg-gear-100 text-gear-800 border-gear-200 hover:bg-gear-200 focus:ring-gear-500 animate-pulse',
    pending: 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200 focus:ring-amber-500',
    new: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 focus:ring-blue-500',
    discount: 'bg-rust-100 text-rust-800 border-rust-200 hover:bg-rust-200 focus:ring-rust-500 font-black',
    default: 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200 focus:ring-slate-500',
  };

  const sizes = {
    xs: 'px-3 py-1.5 text-xs rounded-xl h-8',
    sm: 'px-4 py-2 text-sm rounded-2xl h-10',
    md: 'px-6 py-2.5 text-base rounded-3xl h-12',
    lg: 'px-8 py-3.5 text-lg rounded-[2.5rem] h-16',
  };

  const IconComponent = icon || {
    stock: Package,
    verified: ShieldCheck,
    pending: Clock,
    outOfStock: AlertCircle,
  }[variant];

  return (
    <div
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      role="status"
      aria-label={`Status: ${variant.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}`}
      tabIndex={0}
      {...props}
    >
      {IconComponent && <IconComponent className="w-4 h-4 flex-shrink-0" />}
      <span className="truncate">{children}</span>
    </div>
  );
});

Badge.displayName = 'Badge';

export default Badge;

