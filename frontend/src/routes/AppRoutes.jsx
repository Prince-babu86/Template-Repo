import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../App/AppLayout";
import PublicRoutes from "./PublicRoutes";
import Home from "../pages/Home";
import LoginPage from "../features/auth/pages/LoginPage";
import SignUpPage from "../features/auth/pages/SignUpPage";
import PublicLayout from "../App/PublicLayout";
import PrivateRoute from "./PrivateRoute";
import DashboardPage from "../features/admin/DashboardPage";
import NotFound from "../pages/PageNotFound";
import Reports from "../pages/Report";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/login",
        element: (
          <PublicRoutes>
            <LoginPage />
          </PublicRoutes>
        ),
      },
      {
        path: "/register",
        element: (
          <PublicRoutes>
            <SignUpPage />
          </PublicRoutes>
        ),
      },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/reports",
        element: (
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        ),
      },

      // 404 page not found
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
