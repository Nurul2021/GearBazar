/**
 * Cart Hook
 * Persistent Shopping Cart with Server Sync
 */

"use client";

import { useCallback, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/hooks/useAuth";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  mergeCart,
  setCartFromStorage,
  setCartItems,
  syncCartWithServer,
  fetchCartFromServer,
  addToCartServer,
  removeFromCartServer,
  updateCartItemServer,
  clearCartServer,
  selectCartItems,
  selectCartLoading,
  selectCartSyncing,
  selectCartError,
  selectCartItemCount,
  selectIsCartEmpty,
  selectCartSubtotal,
  selectCartSavings,
  selectCartLastSynced,
  selectIsProductInCart,
  selectProductQuantityInCart,
} from "@/features/cart/cartSlice";
import toast from "react-hot-toast";

export function useCart() {
  const dispatch = useDispatch();
  const { isAuthenticated, role, isVerified } = useAuth();

  const items = useSelector(selectCartItems);
  const loading = useSelector(selectCartLoading);
  const syncing = useSelector(selectCartSyncing);
  const error = useSelector(selectCartError);
  const itemCount = useSelector(selectCartItemCount);
  const isEmpty = useSelector(selectIsCartEmpty);
  const subtotal = useSelector(selectCartSubtotal);
  const savings = useSelector(selectCartSavings);
  const lastSynced = useSelector(selectCartLastSynced);

  // Initialize cart from localStorage on mount
  useEffect(() => {
    dispatch(setCartFromStorage());
  }, [dispatch]);

  // Sync cart when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(syncCartWithServer());
    }
  }, [isAuthenticated, dispatch]);

  const addItem = useCallback(
    async (product, quantity = 1) => {
      dispatch(addToCart({ product, quantity }));
      toast.success(`${product.title} added to cart!`);

      if (isAuthenticated) {
        try {
          await dispatch(
            addToCartServer({
              productId: product._id || product.id,
              quantity,
            }),
          );
        } catch (err) {
          console.error("Failed to sync add to cart:", err);
        }
      }
    },
    [dispatch, isAuthenticated],
  );

  const removeItem = useCallback(
    async (productId) => {
      const item = items.find((i) => i.productId === productId);
      dispatch(removeFromCart(productId));

      if (item?.product?.title) {
        toast.info(`${item.product.title} removed from cart`);
      }

      if (isAuthenticated) {
        try {
          await dispatch(removeFromCartServer(productId));
        } catch (err) {
          console.error("Failed to sync remove from cart:", err);
        }
      }
    },
    [dispatch, isAuthenticated, items],
  );

  const updateItemQuantity = useCallback(
    async (productId, quantity) => {
      dispatch(updateQuantity({ productId, quantity }));

      if (isAuthenticated) {
        try {
          if (quantity <= 0) {
            await dispatch(removeFromCartServer(productId));
          } else {
            await dispatch(updateCartItemServer({ productId, quantity }));
          }
        } catch (err) {
          console.error("Failed to sync quantity update:", err);
        }
      }
    },
    [dispatch, isAuthenticated],
  );

  const clearAll = useCallback(async () => {
    dispatch(clearCart());
    toast.info("Cart cleared");

    if (isAuthenticated) {
      try {
        await dispatch(clearCartServer());
      } catch (err) {
        console.error("Failed to sync clear cart:", err);
      }
    }
  }, [dispatch, isAuthenticated]);

  const syncCart = useCallback(async () => {
    if (isAuthenticated) {
      return await dispatch(syncCartWithServer());
    }
    return null;
  }, [dispatch, isAuthenticated]);

  const fetchCart = useCallback(async () => {
    if (isAuthenticated) {
      return await dispatch(fetchCartFromServer());
    }
    return null;
  }, [dispatch, isAuthenticated]);

  const isInCart = useCallback(
    (productId) => {
      return items.some((item) => item.productId === productId);
    },
    [items],
  );

  const getQuantity = useCallback(
    (productId) => {
      const item = items.find((item) => item.productId === productId);
      return item?.quantity || 0;
    },
    [items],
  );

  const getItemPrice = useCallback(
    (product) => {
      if (!product) return 0;

      if (role === "garage_owner" && isVerified) {
        return (
          product.garagePrice ?? product.wholesalePrice ?? product.price ?? 0
        );
      }

      if (role === "shop" || role === "seller") {
        return product.wholesalePrice ?? product.price ?? 0;
      }

      return product.publicPrice ?? product.price ?? 0;
    },
    [role, isVerified],
  );

  const getFormattedSubtotal = useCallback(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(subtotal);
  }, [subtotal]);

  const getFormattedSavings = useCallback(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(savings);
  }, [savings]);

  const state = useMemo(
    () => ({
      items,
      loading,
      syncing,
      error,
      itemCount,
      isEmpty,
      subtotal,
      savings,
      lastSynced,
    }),
    [
      items,
      loading,
      syncing,
      error,
      itemCount,
      isEmpty,
      subtotal,
      savings,
      lastSynced,
    ],
  );

  const actions = useMemo(
    () => ({
      addItem,
      removeItem,
      updateItemQuantity,
      clearAll,
      syncCart,
      fetchCart,
    }),
    [addItem, removeItem, updateItemQuantity, clearAll, syncCart, fetchCart],
  );

  const helpers = useMemo(
    () => ({
      isInCart,
      getQuantity,
      getItemPrice,
      getFormattedSubtotal,
      getFormattedSavings,
    }),
    [
      isInCart,
      getQuantity,
      getItemPrice,
      getFormattedSubtotal,
      getFormattedSavings,
    ],
  );

  return { ...state, ...actions, ...helpers };
}

export default useCart;
