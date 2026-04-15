/**
 * Cart Context
 * Provides cart functionality using Redux
 */

"use client";

import { createContext, useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartItemCount,
  selectCartTotal,
} from "@/features/cart/cartSlice";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const cartItems = useSelector(selectCartItems);
  const itemCount = useSelector(selectCartItemCount);
  const cartTotal = useSelector(selectCartTotal);

  const cart = useMemo(
    () => ({
      items: cartItems,
      itemCount,
      total: cartTotal,
      getCartTotal: () => cartTotal,
      getItemCount: () => itemCount,
    }),
    [cartItems, itemCount, cartTotal],
  );

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    return {
      items: [],
      itemCount: 0,
      total: 0,
      getCartTotal: () => 0,
      getItemCount: () => 0,
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
    };
  }
  return context;
}

export default CartContext;
