import React from "react";
import Header from "./Components/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Components/Footer";
import LoginModal from "./Login/LoginModal";
import SignupModal from "./Signup/SignupModal";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();

  const dashboardRoutes = [
    "/admin",
    "/restaurant",
    "/ngo",
  ];


  const hideHeaderFooter = dashboardRoutes.some((route)=>(
     location.pathname.toLowerCase().startsWith(route.toLowerCase())
  ))


  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Outlet />
      {!hideHeaderFooter && <Footer />}
      {location.pathname === "/LogIn" && <LoginModal />}
      {location.pathname === "/SignUp" && <SignupModal/>}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
}

export default App;
