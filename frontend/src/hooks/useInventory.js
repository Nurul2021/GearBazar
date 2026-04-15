/**
 * Inventory Hook
 * Easy-to-use hook for accessing inventory state and actions
 */

"use client";

import { useCallback, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  fetchProducts,
  fetchProductById,
  fetchFeaturedProducts,
  fetchCategories,
  searchProducts,
  setFilters,
  setFilter,
  clearFilters,
  setPage,
  setSort,
  setSearch,
  setFilteredProducts,
  clearCurrentProduct,
  selectProducts,
  selectFilteredProducts,
  selectCurrentProduct,
  selectLoading,
  selectFetching,
  selectError,
  selectFilters,
  selectPagination,
  selectSort,
  selectCategories,
  selectBrands,
  selectFeaturedProducts,
  selectProductPrice,
  selectActiveFilters,
  selectHasActiveFilters,
  selectProductCount,
  selectPriceRange,
} from "@/features/inventory/inventorySlice";

export function useInventory() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);
  const currentProduct = useSelector(selectCurrentProduct);
  const loading = useSelector(selectLoading);
  const fetching = useSelector(selectFetching);
  const error = useSelector(selectError);
  const filters = useSelector(selectFilters);
  const pagination = useSelector(selectPagination);
  const sort = useSelector(selectSort);
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const featuredProducts = useSelector(selectFeaturedProducts);
  const productPrice = useSelector(selectProductPrice);
  const activeFilters = useSelector(selectActiveFilters);
  const hasActiveFilters = useSelector(selectHasActiveFilters);
  const productCount = useSelector(selectProductCount);
  const priceRange = useSelector(selectPriceRange);

  const fetchProductsWithFilters = useCallback(
    async (append = false) => {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        sort: sort.field,
        order: sort.order,
        ...filters,
      };

      Object.keys(params).forEach((key) => {
        if (!params[key] || params[key] === "") {
          delete params[key];
        }
      });

      const result = await dispatch(fetchProducts(params));
      return result;
    },
    [dispatch, pagination.page, pagination.limit, sort, filters],
  );

  const fetchProduct = useCallback(
    async (productId) => {
      return dispatch(fetchProductById(productId));
    },
    [dispatch],
  );

  const updateFilter = useCallback(
    (key, value) => {
      dispatch(setFilter({ key, value }));
    },
    [dispatch],
  );

  const updateFilters = useCallback(
    (newFilters) => {
      dispatch(setFilters(newFilters));
    },
    [dispatch],
  );

  const clearAllFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  const changePage = useCallback(
    (page) => {
      dispatch(setPage(page));
    },
    [dispatch],
  );

  const updateSort = useCallback(
    (field, order = "desc") => {
      dispatch(setSort({ field, order }));
    },
    [dispatch],
  );

  const search = useCallback(
    async (query) => {
      dispatch(setSearch(query));
      if (query.length >= 2) {
        await dispatch(searchProducts(query));
      }
    },
    [dispatch],
  );

  const refreshProducts = useCallback(async () => {
    await fetchProductsWithFilters(false);
  }, [fetchProductsWithFilters]);

  const loadMore = useCallback(async () => {
    if (pagination.hasMore && !loading) {
      dispatch(setPage(pagination.page + 1));
    }
  }, [dispatch, pagination.hasMore, pagination.page, loading]);

  const getProductDisplayPrice = useCallback(
    (product) => {
      return productPrice(product);
    },
    [productPrice],
  );

  const getDiscountPercentage = useCallback((product) => {
    if (!product.discount) return 0;
    return Math.round(product.discount);
  }, []);

  const getOriginalPrice = useCallback((product) => {
    return product.price || product.publicPrice || 0;
  }, []);

  const getFormattedPrice = useCallback((price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  }, []);

  const syncFiltersWithUrl = useCallback(() => {
    const urlFilters = {};
    searchParams.forEach((value, key) => {
      if (
        [
          "category",
          "brand",
          "make",
          "model",
          "year",
          "minPrice",
          "maxPrice",
          "sort",
        ].includes(key)
      ) {
        urlFilters[key] = value;
      }
    });
    if (Object.keys(urlFilters).length > 0) {
      dispatch(setFilters(urlFilters));
    }
  }, [dispatch, searchParams]);

  const updateUrlWithFilters = useCallback(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "") {
        params.set(key, value);
      }
    });
    router.push(pathname + "?" + params.toString());
  }, [filters, router, pathname]);

  const applyAdvancedFilter = useCallback(
    async (filterParams) => {
      dispatch(setFilters(filterParams));

      const params = new URLSearchParams();
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value && value !== "") {
          params.set(key, value);
        }
      });

      router.push(pathname + "?" + params.toString());

      const result = await dispatch(
        fetchProducts({ ...filterParams, page: 1 }),
      );
      return result;
    },
    [dispatch, router, pathname],
  );

  const state = useMemo(
    () => ({
      products,
      filteredProducts,
      currentProduct,
      loading,
      fetching,
      error,
      filters,
      pagination,
      sort,
      categories,
      brands,
      featuredProducts,
      activeFilters,
      hasActiveFilters,
      productCount,
      priceRange,
    }),
    [
      products,
      filteredProducts,
      currentProduct,
      loading,
      fetching,
      error,
      filters,
      pagination,
      sort,
      categories,
      brands,
      featuredProducts,
      activeFilters,
      hasActiveFilters,
      productCount,
      priceRange,
    ],
  );

  const actions = useMemo(
    () => ({
      fetchProducts: fetchProductsWithFilters,
      fetchProduct,
      updateFilter,
      updateFilters,
      clearFilters: clearAllFilters,
      changePage,
      updateSort,
      search,
      refreshProducts,
      loadMore,
      applyAdvancedFilter,
      syncFiltersWithUrl,
      updateUrlWithFilters,
    }),
    [
      fetchProductsWithFilters,
      fetchProduct,
      updateFilter,
      updateFilters,
      clearAllFilters,
      changePage,
      updateSort,
      search,
      refreshProducts,
      loadMore,
      applyAdvancedFilter,
      syncFiltersWithUrl,
      updateUrlWithFilters,
    ],
  );

  const helpers = useMemo(
    () => ({
      getProductDisplayPrice,
      getDiscountPercentage,
      getOriginalPrice,
      getFormattedPrice,
    }),
    [
      getProductDisplayPrice,
      getDiscountPercentage,
      getOriginalPrice,
      getFormattedPrice,
    ],
  );

  return { ...state, ...actions, ...helpers };
}

export default useInventory;
