/**
 * Redux Store Configuration
 * Global state store
 */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import inventoryReducer from "../features/inventory/inventorySlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    inventory: inventoryReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
        ignoredPaths: ["auth.user", "inventory.products", "cart.items"],
      },
    }),
});

export default store;
