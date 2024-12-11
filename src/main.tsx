import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react";
import TailwindIndicator from "@/components/utils/tailwind-indicator.tsx";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallback={<span>Something went wrong</span>}>
      <NuqsAdapter>
        <QueryClientProvider client={queryClient}>
          <App />
          <TailwindIndicator />
        </QueryClientProvider>
      </NuqsAdapter>
    </ErrorBoundary>
  </StrictMode>
);
