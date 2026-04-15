/**
 * ProductsGrid Component
 * Displays a grid of product cards with optional title
 */

import ProductCard from "./ProductCard";

export default function ProductsGrid({ products, title, onWishlistToggle }) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-8">
            {title}
          </h2>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onWishlistToggle={onWishlistToggle}
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No products found
            </h3>
            <p className="mt-2 text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
