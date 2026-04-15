/**
 * App Providers
 * Combines all context providers in one place
 */

"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { CartProvider } from "../context/CartContext";
import { ToastProvider } from "../components/ui/ToastProvider";
import { ConfirmationProvider } from "@/components/ui/ConfirmationDialog";
import { SocketProvider } from "../providers/SocketProvider";
import { QueryProvider } from "../providers/QueryProvider";
import { useDispatch } from "react-redux";
import { loadUser, logout } from "../features/auth/authSlice";

function AppInitializer({ children }) {
  const dispatch = useDispatch();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!hasLoaded) {
      dispatch(loadUser()).finally(() => setHasLoaded(true));
    }
  }, [dispatch, hasLoaded]);

  useEffect(() => {
    const handleLogout = () => {
      dispatch(logout());
    };

    if (typeof window !== "undefined") {
      window.addEventListener("logout", handleLogout);
      return () => window.removeEventListener("logout", handleLogout);
    }
  }, [dispatch]);

  return <>{children}</>;
}

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <QueryProvider>
        <ToastProvider />
        <ConfirmationProvider>
          <SocketProvider>
            <AppInitializer>
              <CartProvider>{children}</CartProvider>
            </AppInitializer>
          </SocketProvider>
        </ConfirmationProvider>
      </QueryProvider>
    </Provider>
  );
}

export default Providers;
