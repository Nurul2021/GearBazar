/**
 * Auth Slice
 * Global Auth State Store using Redux Toolkit
 *
 * State: user, token, isAuthenticated, isVerified, role
 * Async Thunks: loginUser, registerUser, loadUser, logout
 * Selectors: isAdmin, isGarageOwner, isSeller, etc.
 */

import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import api from "@/lib/axios";
import toast from "react-hot-toast";

const getStoredToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || null;
  }
  return null;
};

const getStoredUser = () => {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
};

const getInitialState = () => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isVerified: false,
  role: null,
  loading: false,
  error: null,
});

const initialState = getInitialState();

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password, remember = true }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user, refreshToken } = response.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      toast.success(`Welcome back, ${user.name || user.email}!`);
      return { token, user };
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
      return rejectWithValue(error.response?.data || { message });
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", userData);
      const { token, user, refreshToken } = response.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      toast.success("Account created successfully! Welcome to GearBazar.");
      return { token, user };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(message);
      return rejectWithValue(error.response?.data || { message });
    }
  },
);

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    const token = getStoredToken();
    if (!token) {
      return rejectWithValue({ message: "No token found" });
    }

    try {
      const response = await api.get("/auth/me");
      const user = response.data.data;

      localStorage.setItem("user", JSON.stringify(user));
      return { user };
    } catch (error) {
      const status = error.response?.status;
      const isAuthError = status === 401 || status === 403;

      if (isAuthError) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      }
      return rejectWithValue({
        message: isAuthError ? "Session expired" : "Failed to load user",
      });
    }
  },
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.put("/users/profile", userData);
      const user = response.data.data;

      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Profile updated successfully!");
      return { user };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update profile";
      toast.error(message);
      return rejectWithValue(error.response?.data || { message });
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.log("Logout API call failed, proceeding with local logout");
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      toast.info("Logged out successfully.");
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      await api.post("/auth/forgot-password", { email });
      toast.success("Password reset link sent to your email!");
      return true;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to send reset link";
      toast.error(message);
      return rejectWithValue(error.response?.data || { message });
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isVerified = false;
      state.role = null;
      state.loading = false;
      state.error = null;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.role = action.payload?.role || null;
      state.isVerified = action.payload?.isVerified || false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.role = action.payload.user?.role || null;
        state.isVerified = action.payload.user?.isVerified || false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload?.message;
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.role = action.payload.user?.role || null;
        state.isVerified = action.payload.user?.isVerified || false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.role = action.payload.user?.role || null;
        state.isVerified = action.payload.user?.isVerified || false;
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.role = null;
        state.isVerified = false;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isVerified = false;
        state.role = null;
        state.loading = false;
        state.error = null;
      })

      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { logout, clearErrors, setUser } = authSlice.actions;
export default authSlice.reducer;

const selectAuthState = (state) => state.auth;

export const selectUser = createSelector(
  [selectAuthState],
  (auth) => auth.user,
);
export const selectToken = createSelector(
  [selectAuthState],
  (auth) => auth.token,
);
export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (auth) => auth.isAuthenticated,
);
export const selectIsVerified = createSelector(
  [selectAuthState],
  (auth) => auth.isVerified,
);
export const selectRole = createSelector(
  [selectAuthState],
  (auth) => auth.role,
);
export const selectLoading = createSelector(
  [selectAuthState],
  (auth) => auth.loading,
);
export const selectError = createSelector(
  [selectAuthState],
  (auth) => auth.error,
);

export const selectIsAdmin = createSelector(
  [selectRole],
  (role) => role === "admin",
);
export const selectIsGarageOwner = createSelector(
  [selectRole],
  (role) => role === "garage_owner",
);
export const selectIsShop = createSelector(
  [selectRole],
  (role) => role === "shop",
);
export const selectIsSeller = createSelector(
  [selectRole],
  (role) => role === "seller",
);
export const selectIsCustomer = createSelector(
  [selectRole],
  (role) => role === "customer",
);
export const selectIsVendor = createSelector([selectRole], (role) =>
  ["shop", "garage_owner", "seller"].includes(role),
);

export const selectIsVerifiedGarageOwner = createSelector(
  [selectRole, selectIsVerified],
  (role, isVerified) => role === "garage_owner" && isVerified,
);

export const selectIsVerifiedShop = createSelector(
  [selectRole, selectIsVerified],
  (role, isVerified) => role === "shop" && isVerified,
);

export const selectUserName = createSelector(
  [selectUser],
  (user) => user?.name || user?.email?.split("@")[0] || "User",
);
export const selectCurrentUser = selectUser;
export const selectUserEmail = createSelector(
  [selectUser],
  (user) => user?.email,
);
export const selectUserAvatar = createSelector(
  [selectUser],
  (user) => user?.avatar || user?.profileImage,
);
