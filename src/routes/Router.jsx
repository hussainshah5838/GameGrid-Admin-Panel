
import { createBrowserRouter, Outlet } from "react-router-dom";
import React from "react";
// Layouts
import DashboardLayout from "../layouts/SiteLayout";

// Pages
import DashboardPage from "../Pages/MainDashboard";
import TicketsPage from "../Pages/TicketsPage";
import TrendsPage from "../Pages/TrendsPage";
import UsersPage from "../Pages/UsersPage";
import PaymentsPage from "../Pages/PaymentPage";
import LoginPage from "../Pages/Auth/Login";
import ProfilePage from "../Pages/ProfilePage";
import MessagesPage from "../Pages/MessagesPage";
import NotificationsPage from "../Pages/NotificationsPage"; 

const Router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "tickets",
        element: <TicketsPage />,
      },
      {
        path: "trends",
        element: <TrendsPage />,
      },
      {
        path: "payments",
        element: <PaymentsPage />,
      },
      {
        path: "profile/*",
        element: <ProfilePage />,
      },
      {
        path: "messages/*",
        element: <MessagesPage />,
      },
      {
        path: "notifications",         
        element: <NotificationsPage />, 
      },
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
