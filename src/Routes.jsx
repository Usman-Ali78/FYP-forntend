import React, { lazy } from "react";
import App from "./App.jsx";

// Lazy-loaded components
const HomePage = lazy(() => import("./Home/HomePage.jsx"));
const ContactUs = lazy(() => import("./ContactUs/ContactUs.jsx"));
const About = lazy(() => import("./About/About.jsx"));
const AdminDashboard = lazy(() => import("./Admin/AdminDashboard.jsx"));
const RestaurantDashboard = lazy(() =>
  import("./Restaurant/RestaurantDashboard.jsx")
);
const NgoDashboard = lazy(() => import("./Ngo/NgoDashboard.jsx"));
const LoginModal = lazy(() => import("./Login/LoginModal.jsx"));
const SignupModal = lazy(() => import("./Signup/SignupModal.jsx"));

const Routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/contactUs", element: <ContactUs /> },
      { path: "/about", element: <About /> },
      { path: "/admin", element: <AdminDashboard /> },
      { path: "/restaurant", element: <RestaurantDashboard /> },
      { path: "/ngo", element: <NgoDashboard /> },
      { path: "/login", element: <LoginModal /> },
      { path: "/signUp", element: <SignupModal /> },
    ],
  },
];

export default Routes;
