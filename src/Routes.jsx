import React, { lazy } from "react";
import App from "./App.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

// Lazy-loaded components
const HomePage = lazy(() => import("./Pages/Home/HomePage.jsx"));
const ContactUs = lazy(() => import("./Pages/ContactUs/ContactUs.jsx"));
const About = lazy(() => import("./Pages/About/About.jsx"));
const AdminDashboard = lazy(() => import("./Admin/AdminDashboard.jsx"));
const RestaurantDashboard = lazy(() =>
  import("./Restaurant/RestaurantDashboard.jsx")
);
const NgoDashboard = lazy(() => import("./Ngo/NgoDashboard.jsx"));
const LoginModal = lazy(() => import("./Login/LoginModal.jsx"));
const SignupModal = lazy(() => import("./Signup/SignupModal.jsx"));
const Unauthorized = lazy(() => import("./Components/Unauthorized.jsx"));
const ForgotPassword = lazy(() =>
  import("./ForgotPassword/forgotPassword.jsx")
);

const Routes = [
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/login", element: <LoginModal /> },
  { path: "/signUp", element: <SignupModal /> },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/contactUs", element: <ContactUs /> },
      { path: "/about", element: <About /> },
      { path: "/unauthorized", element: <Unauthorized /> },
    ],
  },
  // Protected routes
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/restaurant",
    element: (
      <ProtectedRoute allowedRoles={["restaurant"]}>
        <RestaurantDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ngo",
    element: (
      <ProtectedRoute allowedRoles={["ngo"]}>
        <NgoDashboard />
      </ProtectedRoute>
    ),
  },
];

export default Routes;
