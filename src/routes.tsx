import { RouteObject } from "react-router-dom";
import { MainLayout } from "./components/layout/main-layout";
import HomePage from "./pages/home";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import DashboardPage from "./pages/dashboard";
import TemplatesPage from "./pages/templates";
import CreatePortfolioPage from "./pages/dashboard/create-portfolio";
import PortfolioEditorPage from "./pages/dashboard/portfolio-editor";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "templates", element: <TemplatesPage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "dashboard/create-portfolio", element: <CreatePortfolioPage /> },
      { path: "dashboard/portfolio-editor", element: <PortfolioEditorPage /> },
    ],
  },
];

export default routes;
