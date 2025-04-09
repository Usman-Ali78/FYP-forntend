import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../assets/Logo.jpg";
import LogInBtn from "./LogInBtn";
import SignUpBtn from "./SignUpBtn";
import LoginModal from "../Login/LoginModal";
import SignupModal from "../Signup/SignupModal";

const Header = () => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  useEffect(() => {
    if (isLoginOpen || isSignupOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isLoginOpen, isSignupOpen]);

  const menuItems = ["Home", "About", "ContactUs"];

  return (
    <header className="border shadow-sm bg-white relative w-full">
      <nav className="flex justify-between items-center max-w-7xl mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img src={Logo} className="h-14 w-auto" alt="Logo" />
        </Link>

        <button
          className="lg:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <ul className="hidden lg:flex gap-8 items-center">
          {menuItems.map((item) => (
            <li key={item}>
              <NavLink
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `block px-3 text-[16px] font-medium transition-colors duration-300 ${
                    isActive ? "text-orange-700" : "text-gray-700 hover:text-orange-500"
                  }`
                }
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex">
          <LogInBtn  onClick={() => setIsLoginOpen(true)} />
          <SignUpBtn  onClick={() => setIsSignupOpen(true)} />
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-white z-20 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <img src={Logo} className="h-14 w-auto" alt="Logo" />
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-700 focus:outline-none"
            aria-label="Close Menu"
          >
            <X size={28} />
          </button>
        </div>

        <ul className="flex flex-col items-center gap-6 mt-8">
          {menuItems.map((item) => (
            <li key={item}>
              <NavLink
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `block text-[18px] font-medium py-2 transition-colors duration-300 ${
                    isActive ? "text-orange-700" : "text-gray-700 hover:text-orange-500"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </NavLink>
            </li>
          ))}
          <div className="flex gap-4">
            <LogInBtn  onClick={() => { setIsLoginOpen(true);setIsMenuOpen(false); }} />
            <SignUpBtn onClick={() => { setIsSignupOpen(true); setIsMenuOpen(false); }} />
          </div>
        </ul>
      </div>

      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
      {isSignupOpen && <SignupModal onClose={() => setIsSignupOpen(false)} />}
    </header>
  );
};

export default Header;
