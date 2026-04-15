/**
 * Query Hooks Index
 * Export all TanStack Query hooks
 */

// Products
export * from "./useProducts";

// Orders
export * from "./useOrders";

// Wishlist
export * from "./useWishlist";

// User
export * from "./useUser";

// Pagination & Infinite Scroll Helper
export const usePaginatedData = (queryHook, options = {}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, ...rest } =
    queryHook(options);

  const items =
    data?.pages?.reduce((acc, page) => {
      return [...acc, ...(page.products || page.items || [])];
    }, []) || [];

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    items,
    hasMore: hasNextPage,
    isLoadingMore: isFetchingNextPage,
    loadMore,
    ...rest,
  };
};
