import { RouteObject } from "react-router-dom";
import { MainLayout } from "./components/layout/main-layout";
import HomePage from "./pages/home";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import ForgotPasswordPage from "./pages/auth/forgot-password";
import ResetPasswordPage from "./pages/auth/reset-password";
import DashboardPage from "./pages/dashboard";
import TemplatesPage from "./pages/templates";
import CreatePortfolioPage from "./pages/dashboard/create-portfolio";
import PortfolioEditorPage from "./pages/dashboard/portfolio-editor";
import AdminDashboardPage from "./pages/admin";
import CheckoutPage from "./pages/payment/checkout";
import { ProtectedRoute } from "./lib/protected-route";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "reset-password", element: <ResetPasswordPage /> },
      { path: "templates", element: <TemplatesPage /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/create-portfolio",
        element: (
          <ProtectedRoute>
            <CreatePortfolioPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/portfolio-editor",
        element: (
          <ProtectedRoute>
            <PortfolioEditorPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment/checkout",
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default routes;
