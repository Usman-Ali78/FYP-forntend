import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import image from "../assets/login.avif";
import api from "../../api/api";

const LoginModal = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);

    try {
      const { email, password } = loginData;
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);

      console.log(data);
      if (data.success) {
        if (data.user.userType === "ngo") {
          navigate("/ngo");
        } else if (data.user.userType === "restaurant") {
          navigate("/restaurant");
        } else if (data.user.userType === "admin") {
          navigate("/admin");
        } else {
          alert("Invalid user type");
        }
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred while logging in. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="relative">
        <div className="border-3 border-red-400  bg-gradient-to-r from-orange-300 to-pink-500 text-white p-8 rounded-xl shadow-2xl w-96 h-96 relative transform transition-all duration-500 hover:scale-[1.03]">
          {/* Cross Icon */}
          <button
            className="absolute top-3 right-3 text-white hover:text-gray-200 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <FaTimes className="w-6 h-6" />
          </button>

          <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
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
                <p className="text-red-500 font-semibold text-sm mt-1">
                  {errors.email}
                </p>
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
                <p className="text-red-500 font-semibold text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white p-2 mt-4 rounded-lg hover:bg-green-800 transition-colors duration-300 cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            <button
              className="w-full bg-red-600 text-white p-2 mt-2 rounded-lg hover:bg-red-800 transition-colors duration-300 cursor-pointer"
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
