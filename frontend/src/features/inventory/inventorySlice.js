/**
 * Inventory Slice
 * State management for products with advanced filtering and dynamic pricing
 *
 * Features:
 * - Products state with loading/error states
 * - Dynamic price selector based on user role
 * - Advanced filtering by make, model, year, category
 * - Pagination and sorting
 * - Search functionality
 */

import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { selectRole, selectIsVerified } from "@/features/auth/authSlice";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const initialState = {
  products: [],
  filteredProducts: [],
  currentProduct: null,

  // Filter state
  filters: {
    search: "",
    category: "",
    brand: "",
    make: "",
    model: "",
    year: "",
    minPrice: "",
    maxPrice: "",
    inStock: null,
  },

  // Pagination
  pagination: {
    page: 1,
    limit: 24,
    total: 0,
    totalPages: 0,
    hasMore: false,
  },

  // Sorting
  sort: {
    field: "createdAt",
    order: "desc",
  },

  // State
  loading: false,
  fetching: false,
  error: null,

  // Featured & Categories
  categories: [],
  brands: [],
  featuredProducts: [],

  // Dynamic options for Add Product form
  dynamicOptions: {
    brands: [],
    categories: [],
    warehouses: [],
    suppliers: [],
    storageLocations: [],
    units: [],
  },
  newDynamicOptions: {
    brands: [],
    categories: [],
    warehouses: [],
    suppliers: [],
  },
};

export const fetchProducts = createAsyncThunk(
  "inventory/fetchProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get("/products", { params });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch products" },
      );
    }
  },
);

export const fetchProductById = createAsyncThunk(
  "inventory/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/${productId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Product not found" },
      );
    }
  },
);

export const fetchFeaturedProducts = createAsyncThunk(
  "inventory/fetchFeaturedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/products/featured", { limit: 10 });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch featured products",
        },
      );
    }
  },
);

export const fetchCategories = createAsyncThunk(
  "inventory/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/categories");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch categories" },
      );
    }
  },
);

export const searchProducts = createAsyncThunk(
  "inventory/searchProducts",
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get("/products/search", {
        params: { q: query, limit: 20 },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Search failed" },
      );
    }
  },
);

export const fetchDynamicOptions = createAsyncThunk(
  "inventory/fetchDynamicOptions",
  async (_, { rejectWithValue }) => {
    try {
      const [brandsRes, categoriesRes, warehousesRes, suppliersRes] =
        await Promise.all([
          api.get("/categories/brands"),
          api.get("/categories"),
          api.get("/warehouses"),
          api.get("/suppliers"),
        ]);
      return {
        brands: brandsRes.data.data || [],
        categories: categoriesRes.data.data || [],
        warehouses: warehousesRes.data.data || [],
        suppliers: suppliersRes.data.data || [],
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch options" },
      );
    }
  },
);

export const createNewBrand = createAsyncThunk(
  "inventory/createNewBrand",
  async (brandName, { rejectWithValue }) => {
    try {
      const response = await api.post("/categories/brands", {
        name: brandName,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create brand" },
      );
    }
  },
);

export const createNewCategory = createAsyncThunk(
  "inventory/createNewCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await api.post("/categories", categoryData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create category" },
      );
    }
  },
);

export const createNewWarehouse = createAsyncThunk(
  "inventory/createNewWarehouse",
  async (warehouseData, { rejectWithValue }) => {
    try {
      const response = await api.post("/warehouses", warehouseData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create warehouse" },
      );
    }
  },
);

export const createNewSupplier = createAsyncThunk(
  "inventory/createNewSupplier",
  async (supplierData, { rejectWithValue }) => {
    try {
      const response = await api.post("/suppliers", supplierData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create supplier" },
      );
    }
  },
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },

    setFilter: (state, action) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
      if (key !== "page") {
        state.pagination.page = 1;
      }
    },

    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.page = 1;
    },

    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },

    setSort: (state, action) => {
      state.sort = action.payload;
    },

    setSearch: (state, action) => {
      state.filters.search = action.payload;
      state.pagination.page = 1;
    },

    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },

    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },

    addTempDynamicOption: (state, action) => {
      const { type, value } = action.payload;
      if (type === "brand" && !state.dynamicOptions.brands.includes(value)) {
        state.dynamicOptions.brands.push(value);
        state.newDynamicOptions.brands.push(value);
      } else if (
        type === "category" &&
        !state.dynamicOptions.categories.includes(value)
      ) {
        state.dynamicOptions.categories.push(value);
        state.newDynamicOptions.categories.push(value);
      } else if (
        type === "warehouse" &&
        !state.dynamicOptions.warehouses.includes(value)
      ) {
        state.dynamicOptions.warehouses.push(value);
        state.newDynamicOptions.warehouses.push(value);
      } else if (
        type === "supplier" &&
        !state.dynamicOptions.suppliers.includes(value)
      ) {
        state.dynamicOptions.suppliers.push(value);
        state.newDynamicOptions.suppliers.push(value);
      }
    },

    clearNewDynamicOptions: (state) => {
      state.newDynamicOptions = {
        brands: [],
        categories: [],
        warehouses: [],
        suppliers: [],
      };
    },

    resetInventory: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || [];
        state.filteredProducts = action.payload.products || [];
        state.pagination = {
          page: action.payload.page || 1,
          limit: action.payload.limit || 24,
          total: action.payload.total || 0,
          totalPages: action.payload.totalPages || 0,
          hasMore: action.payload.hasMore || false,
        };
        state.brands = action.payload.brands || [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Fetch Single Product
      .addCase(fetchProductById.pending, (state) => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.fetching = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload?.message;
      })

      // Featured Products
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredProducts = action.payload || [];
      })

      // Categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload || [];
      })

      // Search Products
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload || [];
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Fetch Dynamic Options
      .addCase(fetchDynamicOptions.fulfilled, (state, action) => {
        state.dynamicOptions = {
          brands: action.payload.brands || [],
          categories: action.payload.categories || [],
          warehouses: action.payload.warehouses || [],
          suppliers: action.payload.suppliers || [],
          storageLocations: [],
          units: ["Pcs", "Set", "Pair", "Box", "Liter", "Kg", "Pack"],
        };
      })

      // Create New Brand
      .addCase(createNewBrand.fulfilled, (state, action) => {
        if (action.payload) {
          state.dynamicOptions.brands.push(action.payload);
          state.newDynamicOptions.brands.push(action.payload);
        }
      })

      // Create New Category
      .addCase(createNewCategory.fulfilled, (state, action) => {
        if (action.payload) {
          state.dynamicOptions.categories.push(action.payload);
          state.newDynamicOptions.categories.push(action.payload);
        }
      })

      // Create New Warehouse
      .addCase(createNewWarehouse.fulfilled, (state, action) => {
        if (action.payload) {
          state.dynamicOptions.warehouses.push(action.payload);
          state.newDynamicOptions.warehouses.push(action.payload);
        }
      })

      // Create New Supplier
      .addCase(createNewSupplier.fulfilled, (state, action) => {
        if (action.payload) {
          state.dynamicOptions.suppliers.push(action.payload);
          state.newDynamicOptions.suppliers.push(action.payload);
        }
      });
  },
});

export const {
  setFilters,
  setFilter,
  clearFilters,
  setPage,
  setSort,
  setSearch,
  setFilteredProducts,
  clearCurrentProduct,
  addTempDynamicOption,
  clearNewDynamicOptions,
  resetInventory,
} = inventorySlice.actions;

export default inventorySlice.reducer;

// Base Selectors
export const selectInventoryState = (state) => state.inventory;
export const selectProducts = createSelector(
  [selectInventoryState],
  (inv) => inv.products,
);
export const selectFilteredProducts = createSelector(
  [selectInventoryState],
  (inv) => inv.filteredProducts,
);
export const selectCurrentProduct = createSelector(
  [selectInventoryState],
  (inv) => inv.currentProduct,
);
export const selectLoading = createSelector(
  [selectInventoryState],
  (inv) => inv.loading,
);
export const selectFetching = createSelector(
  [selectInventoryState],
  (inv) => inv.fetching,
);
export const selectError = createSelector(
  [selectInventoryState],
  (inv) => inv.error,
);
export const selectFilters = createSelector(
  [selectInventoryState],
  (inv) => inv.filters,
);
export const selectPagination = createSelector(
  [selectInventoryState],
  (inv) => inv.pagination,
);
export const selectSort = createSelector(
  [selectInventoryState],
  (inv) => inv.sort,
);
export const selectCategories = createSelector(
  [selectInventoryState],
  (inv) => inv.categories,
);
export const selectBrands = createSelector(
  [selectInventoryState],
  (inv) => inv.brands,
);
export const selectFeaturedProducts = createSelector(
  [selectInventoryState],
  (inv) => inv.featuredProducts,
);

// Dynamic Price Selector
export const makeSelectProductPrice = () => {
  return createSelector(
    [selectInventoryState, selectRole, selectIsVerified],
    (inventory, role, isVerified) => {
      return (product) => {
        if (!product) return 0;

        // Verified garage owner gets garage/wholesale pricing
        if (role === "garage_owner" && isVerified) {
          return product.garagePrice || product.wholesalePrice || product.price;
        }

        // Shop/seller gets wholesale pricing
        if (role === "shop" || role === "seller") {
          return product.wholesalePrice || product.price;
        }

        // Regular customers get public price
        return product.publicPrice || product.price || 0;
      };
    },
  );
};

export const selectProductPrice = createSelector(
  [selectInventoryState, selectRole, selectIsVerified],
  (inventory, role, isVerified) => (product) => {
    if (!product) return 0;

    if (role === "garage_owner" && isVerified) {
      return product.garagePrice ?? product.wholesalePrice ?? product.price;
    }

    if (role === "shop" || role === "seller") {
      return product.wholesalePrice ?? product.price;
    }

    return product.publicPrice ?? product.price ?? 0;
  },
);

// Computed Selectors
export const selectActiveFilters = createSelector(
  [selectFilters],
  (filters) => {
    return Object.entries(filters).filter(
      ([key, value]) => value && value !== "" && key !== "page",
    );
  },
);

export const selectHasActiveFilters = createSelector(
  [selectActiveFilters],
  (active) => active.length > 0,
);

export const selectProductCount = createSelector(
  [selectFilteredProducts],
  (products) => products.length,
);

export const selectPriceRange = createSelector([selectProducts], (products) => {
  if (!products.length) return { min: 0, max: 1000 };

  const prices = products.map((p) => p.price || 0).filter((p) => p > 0);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
});

export const selectProductById = (productId) =>
  createSelector([selectProducts], (products) =>
    products.find((p) => p._id === productId),
  );

export const selectProductsByCategory = (category) =>
  createSelector([selectFilteredProducts], (products) =>
    products.filter(
      (p) => p.category?.toLowerCase() === category.toLowerCase(),
    ),
  );

export const selectIsProductInStock = (productId) =>
  createSelector(
    [selectProductById(productId)],
    (product) => product?.inStock ?? false,
  );

// Select products with discount
export const selectOnSaleProducts = createSelector(
  [selectFilteredProducts],
  (products) => products.filter((p) => p.discount && p.discount > 0),
);

// Select new products
export const selectNewArrivals = createSelector(
  [selectFilteredProducts],
  (products) => products.filter((p) => p.isNew),
);

// Dynamic Options Selectors
export const selectDynamicOptions = createSelector(
  [selectInventoryState],
  (inv) => inv.dynamicOptions,
);

export const selectNewDynamicOptions = createSelector(
  [selectInventoryState],
  (inv) => inv.newDynamicOptions,
);
