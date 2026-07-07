import { QueryClient } from "@tanstack/react-query";

/**
 * Shared TanStack Query client for the whole app.
 * Keep a single instance so every screen shares one cache.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
