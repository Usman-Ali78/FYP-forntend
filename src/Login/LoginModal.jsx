import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import image from "../assets/loginimg.avif";

const LoginModal = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Fake user data for demonstration (Replace with API call)
  const users = [
    { email: "admin@example.com", password: "admin123", role: "admin" },
    { email: "ngo@example.com", password: "ngo12345", role: "ngo" },
    { email: "restaurant@example.com", password: "restaurant123", role: "restaurant" },
  ];

  const validate = () => {
    let newErrors = {};
    if (!loginData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (loginData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Find user based on email and password
      const user = users.find(
        (u) => u.email === loginData.email && u.password === loginData.password
      );

      if (user) {
        console.log("Login Successful:", user);
        setErrors({});

        // Redirect based on role
        if (user.role === "admin") {
          navigate("/Admin");
        } else if (user.role === "ngo") {
          navigate("/Ngo");
        } else if (user.role === "restaurant") {
          navigate("/Restaurant");
        }
      } else {
        setErrors({
          email: "Invalid credentials",
          password: "Invalid credentials",
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})`, }}
      ></div>
      <div className="relative">
        <div className="border-3 border-red-500  bg-gradient-to-r from-orange-300 to-pink-500 text-white p-8 rounded-lg shadow-2xl w-96 relative transform transition-all duration-500 hover:scale-[1.03]">
          {/* Cross Icon */}
          <button
            className="absolute top-3 right-3 text-white hover:text-gray-200 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <FaTimes className="w-6 h-6" />
          </button>

          <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit} action="/">
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-200 rounded-lg placeholder-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors duration-300"
                value={loginData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 font-semibold text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 border border-gray-200 rounded-lg placeholder-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors duration-300"
                value={loginData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 font-semibold text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 text-white p-2 mt-4 rounded-lg hover:bg-pink-600 transition-colors duration-300 cursor-pointer"
            >
              Login
            </button>
            <button
              className="w-full bg-orange-500 text-white p-2 mt-2 rounded-lg hover:bg-orange-600 transition-colors duration-300 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Don't have an Account? Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;