import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import image from "../assets/register.jpg";
import api from "../../api/api";

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
      {/* Background image and gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center blur-[2px] brightness-75 transition-all duration-500"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60"></div>
      </div>

      {/* Glassmorphic Form Card */}
      <div className="relative z-10 w-96 rounded-2xl border  backdrop-blur-md shadow-2xl p-8 text-white">
        {/* Cross Icon */}
        <button
          className="absolute top-3 right-3 text-white hover:text-gray-300 transition"
          onClick={() => navigate("/")}
        >
          <FaTimes className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-semibold mb-6 text-center">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name / Business Name"
              className="w-full p-3 rounded-lg bg-white/10 placeholder-white/70 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-300"
              value={signupData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name}</p>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-white/10 placeholder-white/70 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-300"
              value={signupData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email}</p>
            )}

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="w-full p-3 rounded-lg bg-white/10 placeholder-white/70 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-300"
              value={signupData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-red-400 text-sm">{errors.phone}</p>
            )}

            <select
              name="userType"
              className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-300"
              value={signupData.userType}
              onChange={handleChange}
            >
              <option className="text-black" value="restaurant">
                Donor
              </option>
              <option className="text-black" value="ngo">
                NGO
              </option>
            </select>

            <input
              type="text"
              name="location"
              placeholder="Location"
              className="w-full p-3 rounded-lg bg-white/10 placeholder-white/70 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-300"
              value={signupData.location}
              onChange={handleChange}
            />
            {errors.location && (
              <p className="text-red-400 text-sm">{errors.location}</p>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-white/10 placeholder-white/70 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-300"
              value={signupData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password}</p>
            )}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-3 rounded-lg bg-white/10 placeholder-white/70 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-300"
              value={signupData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
            )}

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="termsAccepted"
                className="accent-amber-400"
                checked={signupData.termsAccepted}
                onChange={handleChange}
              />
              <label className="text-sm">
                I accept the terms and conditions
              </label>
            </div>
            {errors.termsAccepted && (
              <p className="text-red-400 text-sm">{errors.termsAccepted}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-6 w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-600 transition-colors font-semibold cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          <button
            className="mt-3 w-full py-3 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Already Have an Account? Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
