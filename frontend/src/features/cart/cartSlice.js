/**
 * Cart Slice
 * Persistent Shopping Cart with Server Sync
 *
 * Features:
 * - Local Storage persistence with redux-persist
 * - Add, remove, update quantity actions
 * - Server sync on login
 * - Dynamic pricing based on user role
 * - Subtotal calculator
 */

import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import api from "@/lib/axios";
import {
  selectRole,
  selectIsVerified,
  selectIsAuthenticated,
} from "@/features/auth/authSlice";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const initialState = {
  items: [],
  loading: false,
  syncing: false,
  error: null,
  lastSynced: null,
};

// Utility: Get cart from localStorage
const getLocalCart = () => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

// Utility: Save cart to localStorage
const saveLocalCart = (items) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(items));
  }
};

// Async Thunks
export const syncCartWithServer = createAsyncThunk(
  "cart/syncWithServer",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const localCart = state.cart.items;

      if (localCart.length === 0) {
        return { items: [], synced: true };
      }

      const response = await api.post("/cart/sync", { items: localCart });
      return {
        items: response.data.data?.items || localCart,
        synced: true,
      };
    } catch (error) {
      console.error("Cart sync failed:", error);
      return rejectWithValue({
        message: "Failed to sync cart",
        localItems: getState().cart.items,
      });
    }
  },
);

export const fetchCartFromServer = createAsyncThunk(
  "cart/fetchFromServer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/cart");
      return { items: response.data.data?.items || [] };
    } catch (error) {
      return rejectWithValue({ message: "Failed to fetch cart" });
    }
  },
);

export const addToCartServer = createAsyncThunk(
  "cart/addToCartServer",
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const response = await api.post("/cart/add", { productId, quantity });
      return { items: response.data.data?.items || [] };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to add item" },
      );
    }
  },
);

export const removeFromCartServer = createAsyncThunk(
  "cart/removeFromCartServer",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/cart/items/${productId}`);
      return { items: response.data.data?.items || [], productId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to remove item" },
      );
    }
  },
);

export const updateCartItemServer = createAsyncThunk(
  "cart/updateCartItemServer",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/cart/items/${productId}`, { quantity });
      return { items: response.data.data?.items || [] };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update item" },
      );
    }
  },
);

export const clearCartServer = createAsyncThunk(
  "cart/clearCartServer",
  async (_, { rejectWithValue }) => {
    try {
      await api.delete("/cart/clear");
      return { items: [] };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to clear cart" },
      );
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingIndex = state.items.findIndex(
        (item) =>
          item.productId === product._id || item.productId === product.id,
      );

      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += quantity;
      } else {
        state.items.push({
          productId: product._id || product.id,
          product: product,
          quantity: quantity,
          addedAt: new Date().toISOString(),
        });
      }

      saveLocalCart(state.items);
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);
      saveLocalCart(state.items);
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.productId === productId);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.productId !== productId,
          );
        } else {
          item.quantity = quantity;
        }
      }

      saveLocalCart(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      saveLocalCart([]);
    },

    mergeCart: (state, action) => {
      const serverItems = action.payload;

      if (serverItems.length === 0) return;

      const merged = [...state.items];

      serverItems.forEach((serverItem) => {
        const existingIndex = merged.findIndex(
          (item) => item.productId === serverItem.productId,
        );

        if (existingIndex >= 0) {
          merged[existingIndex].quantity = Math.max(
            merged[existingIndex].quantity,
            serverItem.quantity,
          );
        } else {
          merged.push(serverItem);
        }
      });

      state.items = merged;
      saveLocalCart(merged);
    },

    setCartFromStorage: (state) => {
      const localCart = getLocalCart();
      if (localCart.length > 0) {
        state.items = localCart;
      }
    },

    setCartItems: (state, action) => {
      state.items = action.payload;
      saveLocalCart(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(syncCartWithServer.pending, (state) => {
        state.syncing = true;
        state.error = null;
      })
      .addCase(syncCartWithServer.fulfilled, (state, action) => {
        state.syncing = false;
        state.items = action.payload.items;
        state.lastSynced = new Date().toISOString();
        saveLocalCart(action.payload.items);
      })
      .addCase(syncCartWithServer.rejected, (state, action) => {
        state.syncing = false;
        state.error = action.payload?.message;
      })

      .addCase(fetchCartFromServer.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartFromServer.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.lastSynced = new Date().toISOString();
        saveLocalCart(action.payload.items);
      })
      .addCase(fetchCartFromServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(addToCartServer.fulfilled, (state, action) => {
        state.items = action.payload.items;
        saveLocalCart(action.payload.items);
      })

      .addCase(removeFromCartServer.fulfilled, (state, action) => {
        state.items = action.payload.items;
        saveLocalCart(action.payload.items);
      })

      .addCase(updateCartItemServer.fulfilled, (state, action) => {
        state.items = action.payload.items;
        saveLocalCart(action.payload.items);
      })

      .addCase(clearCartServer.fulfilled, (state) => {
        state.items = [];
        saveLocalCart([]);
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  mergeCart,
  setCartFromStorage,
  setCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;

// Base Selectors
export const selectCartState = (state) => state.cart;
export const selectCartItems = createSelector(
  [selectCartState],
  (cart) => cart.items,
);
export const selectCartLoading = createSelector(
  [selectCartState],
  (cart) => cart.loading,
);
export const selectCartSyncing = createSelector(
  [selectCartState],
  (cart) => cart.syncing,
);
export const selectCartError = createSelector(
  [selectCartState],
  (cart) => cart.error,
);
export const selectCartLastSynced = createSelector(
  [selectCartState],
  (cart) => cart.lastSynced,
);

// Computed Selectors
export const selectCartItemCount = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0),
);

export const selectIsCartEmpty = createSelector(
  [selectCartItems],
  (items) => items.length === 0,
);

export const selectCartTotalItems = selectCartItemCount;

// Dynamic Price Calculator Selector
export const makeSelectCartSubtotal = () => {
  return createSelector(
    [selectCartItems, selectRole, selectIsVerified],
    (items, role, isVerified) => {
      return items.reduce((total, item) => {
        const product = item.product || {};
        let price = 0;

        if (role === "garage_owner" && isVerified) {
          price =
            product.garagePrice ?? product.wholesalePrice ?? product.price ?? 0;
        } else if (role === "shop" || role === "seller") {
          price = product.wholesalePrice ?? product.price ?? 0;
        } else {
          price = product.publicPrice ?? product.price ?? 0;
        }

        return total + price * item.quantity;
      }, 0);
    },
  );
};

export const selectCartSubtotal = createSelector(
  [selectCartItems, selectRole, selectIsVerified],
  (items, role, isVerified) => {
    return items.reduce((total, item) => {
      const product = item.product || {};
      let price = 0;

      if (role === "garage_owner" && isVerified) {
        price =
          product.garagePrice ?? product.wholesalePrice ?? product.price ?? 0;
      } else if (role === "shop" || role === "seller") {
        price = product.wholesalePrice ?? product.price ?? 0;
      } else {
        price = product.publicPrice ?? product.price ?? 0;
      }

      return total + price * item.quantity;
    }, 0);
  },
);

// Savings Calculator (compared to public price)
export const selectCartSavings = createSelector([selectCartItems], (items) => {
  return items.reduce((savings, item) => {
    const product = item.product || {};
    const publicPrice = product.publicPrice ?? product.price ?? 0;
    const userPrice =
      product.wholesalePrice ?? product.garagePrice ?? product.price ?? 0;

    if (userPrice < publicPrice) {
      return savings + (publicPrice - userPrice) * item.quantity;
    }
    return savings;
  }, 0);
});

// Select cart item by product ID
export const selectCartItemByProductId = (productId) =>
  createSelector([selectCartItems], (items) =>
    items.find((item) => item.productId === productId),
  );

// Check if product is in cart
export const selectIsProductInCart = (productId) =>
  createSelector([selectCartItems], (items) =>
    items.some((item) => item.productId === productId),
  );

// Select total price (simple sum)
export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + (item.price || 0) * item.quantity, 0),
);

// Get quantity of specific product in cart
export const selectProductQuantityInCart = (productId) =>
  createSelector([selectCartItems], (items) => {
    const item = items.find((item) => item.productId === productId);
    return item?.quantity || 0;
  });
