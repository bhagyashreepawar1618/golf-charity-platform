import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/User.context.jsx";
import { AdminProvider } from "./contexts/Admin.context.jsx";
import "./index.css";
import Layout from "./components/main_components/Layout.jsx";
import Home from "./components/main_components/Home.jsx";
import Register from "./components/user_components/Register.jsx";
import Login from "./components/user_components/Login.jsx";
import Profile from "./components/user_components/UserProfile.jsx";
import AuthLoader from "./components/user_components/AuthLoader.jsx";
import AdminLayout from "./components/admin_components/AdminLayout.jsx";
import AdminDashboard from "./components/admin_components/AdminDashboard.jsx";
import AddScore from "./components/user_components/AddScore.jsx";
import UpdateProfile from "./components/user_components/UpdateUserProfile.jsx";
import Subscription from "./components/main_components/Subscription.jsx";
import SelectCharity from "./components/main_components/CharitySelection.jsx";
import AddCharity from "./components/admin_components/SetCharity.jsx";
import MyScores from "./components/user_components/MyScores.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "subscribe",
        element: <Subscription />,
      },
      {
        path: "charity",
        element: <SelectCharity />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "my-scores",
        element: <MyScores />,
      },
      {
        path: "add-score",
        element: <AddScore />,
      },
      {
        path: "update-user-profile",
        element: <UpdateProfile />,
      },
      {
        path: "admin-profile",
        element: <AdminLayout />,
        children: [
          {
            path: "admin-dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "set-charity",
            element: <AddCharity />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminProvider>
      <UserProvider>
        <AuthLoader>
          <RouterProvider router={router}></RouterProvider>
        </AuthLoader>
      </UserProvider>
    </AdminProvider>
  </StrictMode>,
);
