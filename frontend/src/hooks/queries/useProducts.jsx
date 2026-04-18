/**
 * Product Queries
 * TanStack Query hooks for product data fetching
 */

import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import api from "@/lib/axios";

// Query Keys
export const productKeys = {
  all: ["products"],
  lists: () => [...productKeys.all, "list"],
  list: (filters) => [...productKeys.lists(), filters],
  details: () => [...productKeys.all, "detail"],
  detail: (id) => [...productKeys.details(), id],
  featured: () => [...productKeys.all, "featured"],
  latest: () => [...productKeys.all, "latest"],
  categories: () => [...productKeys.all, "categories"],
  search: (query) => [...productKeys.all, "search", query],
};

// Fetch Products with Pagination
export function useProducts(filters = {}) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: async () => {
      const response = await api.get("/products", { params: filters });
      return response.data.data.products;
    },
    staleTime: 5 * 60 * 1000, // 5-minute cache
  });
}

// Fetch Single Product
export function useProduct(productId) {
  return useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: async () => {
      const response = await api.get(`/products/${productId}`);
      return response.data.data;
    },
    enabled: !!productId,
  });
}

// Fetch Featured Products
export function useFeaturedProducts(limit = 10) {
  return useQuery({
    queryKey: productKeys.featured(),
    queryFn: async () => {
      const response = await api.get("/products/featured", {
        params: { limit },
      });
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Fetch Latest Products
export function useLatestProducts(limit = 10) {
  return useQuery({
    queryKey: productKeys.latest(),
    queryFn: async () => {
      const response = await api.get("/products", {
        params: { sort: "-createdAt", limit },
      });
      return response.data.data.products;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Fetch Categories
export function useCategories() {
  return useQuery({
    queryKey: productKeys.categories(),
    queryFn: async () => {
      const response = await api.get("/categories");
      return response.data.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes for categories
  });
}

// Search Products
export function useSearchProducts(query) {
  return useQuery({
    queryKey: productKeys.search(query),
    queryFn: async () => {
      const response = await api.get("/products/search", {
        params: { q: query, limit: 20 },
      });
      return response.data.data;
    },
    enabled: query.length >= 2,
  });
}

// Infinite Scrolling Products
export function useInfiniteProducts(filters = {}) {
  return useInfiniteQuery({
    queryKey: productKeys.list(filters),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get("/products", {
        params: { ...filters, page: pageParam, limit: 24 },
      });
      return response.data.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasMore) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Create Product (Admin/Vendor)
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productData) => {
      const response = await api.post("/products", productData);
      return response.data.data;
    },
    onSuccess: (newProduct) => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
}

// Update Product
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, data }) => {
      const response = await api.put(`/products/${productId}`, data);
      return response.data.data;
    },
    onSuccess: (updatedProduct, { productId }) => {
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(productId),
      });
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
}

// Delete Product
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      await api.delete(`/products/${productId}`);
      return productId;
    },
    onSuccess: (productId) => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.removeQueries({ queryKey: productKeys.detail(productId) });
    },
  });
}
