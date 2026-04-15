/**
 * React Query Setup
 * Configure TanStack Query with the API layer
 */

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const defaultQueryClientOptions = {
  queries: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 1,
    refetchOnWindowFocus: false,
  },
  mutations: {
    retry: 0,
  },
};

export function QueryProvider({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          ...defaultQueryClientOptions,
          queries: {
            ...defaultQueryClientOptions.queries,
            staleTime: 5 * 60 * 1000, // 5-minute cache
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;
