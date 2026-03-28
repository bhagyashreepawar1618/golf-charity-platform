import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/User.context.jsx";
import "./index.css";
import Layout from "./components/main_components/Layout.jsx";
import Home from "./components/main_components/Home.jsx";
import Register from "./components/user_components/Register.jsx";
import Login from "./components/user_components/Login.jsx";
import Profile from "./components/user_components/UserProfile.jsx";

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
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router}></RouterProvider>
    </UserProvider>
  </StrictMode>,
);
