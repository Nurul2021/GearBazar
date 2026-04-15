/**
 * Wishlist Queries
 * TanStack Query hooks with Optimistic Updates for wishlist actions
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import toast from "react-hot-toast";

// Query Keys
export const wishlistKeys = {
  all: ["wishlist"],
  list: () => [...wishlistKeys.all, "list"],
  check: (productId) => [...wishlistKeys.all, "check", productId],
};

// Fetch Wishlist
export function useWishlist() {
  return useQuery({
    queryKey: wishlistKeys.list(),
    queryFn: async () => {
      const response = await api.get("/wishlist");
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Check if Product is in Wishlist
export function useIsInWishlist(productId) {
  return useQuery({
    queryKey: wishlistKeys.check(productId),
    queryFn: async () => {
      const response = await api.get(`/wishlist/check/${productId}`);
      return response.data.data?.inWishlist || false;
    },
    enabled: !!productId,
  });
}

// Add to Wishlist - Optimistic Update
export function useAddToWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const response = await api.post("/wishlist", { productId });
      return response.data.data;
    },
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: wishlistKeys.list() });

      const previousWishlist = queryClient.getQueryData(wishlistKeys.list());

      // Optimistically add to wishlist
      queryClient.setQueryData(wishlistKeys.list(), (old = []) => {
        return [...old, { productId, addedAt: new Date().toISOString() }];
      });

      // Optimistically update check query
      queryClient.setQueryData(wishlistKeys.check(productId), true);

      toast.success("Added to wishlist! 💚");

      return { previousWishlist };
    },
    onError: (error, productId, context) => {
      // Rollback on error
      if (context?.previousWishlist) {
        queryClient.setQueryData(wishlistKeys.list(), context.previousWishlist);
      }
      queryClient.setQueryData(wishlistKeys.check(productId), false);
      toast.error("Failed to add to wishlist");
    },
    onSettled: () => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: wishlistKeys.list() });
    },
  });
}

// Remove from Wishlist - Optimistic Update
export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      await api.delete(`/wishlist/${productId}`);
      return productId;
    },
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: wishlistKeys.list() });

      const previousWishlist = queryClient.getQueryData(wishlistKeys.list());

      // Optimistically remove from wishlist
      queryClient.setQueryData(wishlistKeys.list(), (old = []) => {
        return old.filter((item) => item.productId !== productId);
      });

      // Optimistically update check query
      queryClient.setQueryData(wishlistKeys.check(productId), false);

      toast("Removed from wishlist", { icon: "💔" });

      return { previousWishlist };
    },
    onError: (error, productId, context) => {
      // Rollback on error
      if (context?.previousWishlist) {
        queryClient.setQueryData(wishlistKeys.list(), context.previousWishlist);
      }
      queryClient.setQueryData(wishlistKeys.check(productId), true);
      toast.error("Failed to remove from wishlist");
    },
    onSettled: () => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: wishlistKeys.list() });
    },
  });
}

// Toggle Wishlist - Combined optimistic update
export function useToggleWishlist() {
  const queryClient = useQueryClient();
  const addMutation = useAddToWishlist();
  const removeMutation = useRemoveFromWishlist();

  return {
    mutate: async (productId, isCurrentlyInWishlist) => {
      if (isCurrentlyInWishlist) {
        await removeMutation.mutateAsync(productId);
      } else {
        await addMutation.mutateAsync(productId);
      }
    },
    isLoading: addMutation.isPending || removeMutation.isPending,
  };
}

// Wishlist count (derived)
export function useWishlistCount() {
  const { data } = useWishlist();
  return data?.length || 0;
}
