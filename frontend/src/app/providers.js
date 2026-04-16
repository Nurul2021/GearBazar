"use client";

import { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../store";
import { CartProvider } from "../context/CartContext";
import { ToastProvider } from "../components/ui/ToastProvider";
import { ConfirmationProvider } from "@/components/ui/ConfirmationDialog";
import { QueryProvider } from "../providers/QueryProvider";

function AppInitializer({ children }) {
  const dispatch = useDispatch();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!hasLoaded) {
      setHasLoaded(true);
    }
  }, [hasLoaded]);

  return <>{children}</>;
}

export function Providers({ children }) {
  const isDemo = process.env.NEXT_PUBLIC_DEMO === "true";

  return (
    <Provider store={store}>
      <QueryProvider>
        <ToastProvider />
        <ConfirmationProvider>
          <AppInitializer>
            <CartProvider>{children}</CartProvider>
          </AppInitializer>
        </ConfirmationProvider>
      </QueryProvider>
    </Provider>
  );
}

export default Providers;
