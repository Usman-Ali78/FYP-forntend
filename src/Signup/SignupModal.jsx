import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import image from "../assets/Signupimg.jpg";
import api from "../../api/api";
import { pre } from "framer-motion/client";

const SignupModal = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "restaurant",
    location: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!signupData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!signupData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!signupData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (signupData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (signupData.confirmPassword !== signupData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!signupData.location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!signupData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData({
      ...signupData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;
  setIsLoading(true);

  try {
    const { confirmPassword, ...payload } = signupData;

    const { data } = await api.post("/auth/signup", {
      ...payload,
      confirmPassword,
    });
    
    alert("Signup successful! Please log in to get started");
    navigate("/login");
  } catch (err) {
    if (err.response?.data?.message) {
      alert(err.response.data.message);
    } else {
      alert("Signup failed. Please try again.");
    }
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.94,
        }}
      ></div>
      <div className="relative flex items-center justify-center">
        <div className=" border-3 border-amber-200  bg-gradient-to-r from-teal-500 to-indigo-500 duration-500 text-white p-8 rounded-lg shadow-2xl w-96 relative transform transition-transform hover:scale-[1.02]">
          {/* Cross Icon */}
          <button
            className="absolute top-3 right-3 text-white hover:text-gray-200 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <FaTimes className="w-6 h-6" />
          </button>

          <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name / Business Name"
                className="w-full p-2 border border-gray-300 rounded-lg placeholder-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={signupData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 font-semibold">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded-lg placeholder-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={signupData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 font-semibold">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="w-full p-2 border border-gray-300 rounded-lg placeholder-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={signupData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1 font-semibold">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="mb-4">
              <select
                name="userType"
                className="w-full p-2 border border-gray-300 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={signupData.userType}
                onChange={handleChange}
              >
                <option className="text-white bg-black" value="restaurant">
                  Donor
                </option>
                <option className="text-white bg-black" value="ngo">
                  NGO
                </option>
              </select>
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="location"
                placeholder="Location"
                className="w-full p-2 border border-gray-300 rounded-lg placeholder-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={signupData.location}
                onChange={handleChange}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1 font-semibold">
                  {errors.location}
                </p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded-lg placeholder-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={signupData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 font-semibold">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full p-2 border border-gray-300 rounded-lg placeholder-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={signupData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 font-semibold">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                name="termsAccepted"
                className="mr-2"
                checked={signupData.termsAccepted}
                onChange={handleChange}
              />
              <label>I accept the terms and conditions</label>
            </div>
            {errors.termsAccepted && (
              <p className="text-red-500 text-sm mt-1 font-semibold">
                {errors.termsAccepted}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-2 mt-4 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
            <button
              className="w-full bg-red-600 text-white p-2 mt-2 rounded-lg hover:bg-red-800 transition-colors cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Already Have an Account? Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
