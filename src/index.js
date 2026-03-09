import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { MaterialUIControllerProvider } from "context";
import { AuthProvider } from "shared/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const container = document.getElementById("app");
const root = createRoot(container);

export const mainQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 120, // 30 seconds - cache expires after 30 seconds
      gcTime: 1000 * 60 * 10, // 5 minutes - inactive queries are garbage collected after 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      throwOnError: true,
    },
  },
});

root.render(
  <BrowserRouter>
    {" "}
    <MaterialUIControllerProvider>
      <QueryClientProvider client={mainQueryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
