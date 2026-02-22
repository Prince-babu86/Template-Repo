import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App/App";
import { router } from "./routes/AppRoutes";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./context/auth/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
