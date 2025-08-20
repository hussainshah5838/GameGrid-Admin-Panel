import { createBrowserRouter, Outlet } from "react-router-dom";
import React from "react";
// Layouts
import DashboardLayout from "../layouts/SiteLayout";

// Pages
import DashboardContent from "../Pages/MainDashboard";
import UsersPage from "../Pages/UsersPage";
import Stores from "../Pages/Stores";
import ShipmentsPage from "../Pages/ShipmentsPage";
import PaymentsPage from "../Pages/PaymentPage";
import LoginPage from "../Pages/Auth/Login";
import ProfilePage from "../Pages/ProfilePage";
import MessagesPage from "../Pages/MessagesPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardContent />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "store",
        element: <Stores />,
      },
      {
        path: "shipments",
        element: <ShipmentsPage />,
      },
      {
        path: "payments",
        element: <PaymentsPage />,
      },
      { path: "profile/*", element: <ProfilePage /> },
      { path: "messages/*", element: <MessagesPage /> },
    ],
  },
  {
    path: "/auth",
    element: <Outlet />,
    children: [
      {
        index: true,
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default Router;
