/**
 * Skeleton Loaders
 * Loading placeholder shapes for data fetching states
 */

"use client";

export function Skeleton({ className = "", ...props }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 bg-[length:200%_100%] ${className}`}
      {...props}
    />
  );
}

/**
 * Skeleton for Product Card
 */
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-slate-100">
      <Skeleton className="h-48 lg:h-56 w-full rounded-t-xl" />
      <div className="p-4">
        <Skeleton className="h-3 w-16 mb-2 rounded" />
        <Skeleton className="h-5 w-full mb-1 rounded" />
        <Skeleton className="h-5 w-3/4 mb-3 rounded" />
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-4 w-12 rounded" />
        </div>
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  );
}

/**
 * Grid of Product Card Skeletons
 */
export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Skeleton for Table Row
 */
export function TableRowSkeleton({ columns = 5 }) {
  return (
    <tr className="border-b border-slate-100">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-4">
          <Skeleton className="h-4 w-full rounded" />
        </td>
      ))}
    </tr>
  );
}

/**
 * Skeleton for Data Table
 */
export function TableSkeleton({ rows = 5, columns = 5 }) {
  return (
    <div className="w-full">
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="flex px-4 py-3">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1 rounded" />
          ))}
        </div>
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRowSkeleton key={i} columns={columns} />
      ))}
    </div>
  );
}

/**
 * Skeleton for Detail Card
 */
export function DetailCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-5 w-32 mb-2 rounded" />
          <Skeleton className="h-4 w-24 rounded" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-full rounded" />
        </div>
        <Skeleton className="h-4 w-3/4 rounded" />
        <Skeleton className="h-4 w-1/2 rounded" />
      </div>
    </div>
  );
}

/**
 * Skeleton for Form Fields
 */
export function FormFieldSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-24 rounded" />
      <Skeleton className="h-12 w-full rounded-xl" />
    </div>
  );
}

/**
 * Skeleton for Image Gallery
 */
export function ImageGallerySkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-96 w-full rounded-2xl" />
      <div className="flex gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-20 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton for Stats Card
 */
export function StatsCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <Skeleton className="h-8 w-16 mb-2 rounded" />
      <Skeleton className="h-3 w-20 rounded" />
    </div>
  );
}

/**
 * Skeleton for List Items
 */
export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100">
      <Skeleton className="h-12 w-12 rounded-lg" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-48 rounded" />
        <Skeleton className="h-3 w-32 rounded" />
      </div>
      <Skeleton className="h-8 w-20 rounded-lg" />
    </div>
  );
}

export default {
  Skeleton,
  ProductCardSkeleton,
  ProductGridSkeleton,
  TableRowSkeleton,
  TableSkeleton,
  DetailCardSkeleton,
  FormFieldSkeleton,
  ImageGallerySkeleton,
  StatsCardSkeleton,
  ListItemSkeleton,
};
