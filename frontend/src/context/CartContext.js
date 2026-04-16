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

  const value = useMemo(
    () => ({
      items: cartItems,
      itemCount,
      total: cartTotal,
    }),
    [cartItems, itemCount, cartTotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
