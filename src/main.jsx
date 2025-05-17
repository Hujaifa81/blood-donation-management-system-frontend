import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './index.css';
import { router } from './routes/Routes.jsx';
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </QueryClientProvider>
  </React.StrictMode>
);