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
    password: "",
    confirmPassword: "",
    userType: "",
    ngo_name: "",
    registration_number: "",
    ngo_phone: "",
    ngo_location: "",
    restaurant_name: "",
    license_number: "",
    restaurant_phone: "",
    restaurant_location: "",
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
    if (!signupData.userType) {
      newErrors.userType = "User type is required";
    }
    if (signupData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (signupData.confirmPassword !== signupData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    // NGO specific validation
    if (signupData.userType === "ngo") {
      if (!signupData.ngo_name.trim()) {
        newErrors.ngo_name = "Ngo name is required";
      }
      if (!signupData.registration_number.trim()) {
        newErrors.registration_number = "Registration number is required";
      }
      if (!signupData.ngo_phone.trim()) {
        newErrors.ngo_phone = "Phone number is required";
      } else if (!/^[0-9]{10,15}$/.test(signupData.ngo_phone)) {
        newErrors.ngo_phone = "Invalid phone number format";
      }
      if (!signupData.ngo_location.trim()) {
        newErrors.ngo_location = "Location is required";
      }
    }

    // Restaurant specific validation
    if (signupData.userType === "restaurant") {
      if (!signupData.restaurant_name.trim()) {
        newErrors.restaurant_name = "Restaurant name is required";
      }
      if (!signupData.license_number.trim()) {
        newErrors.license_number = "License number is required";
      }
      if (!signupData.restaurant_phone.trim()) {
        newErrors.restaurant_phone = "Phone number is required";
      } else if (!/^[0-9]{10,15}$/.test(signupData.restaurant_phone)) {
        newErrors.restaurant_phone = "Invalid phone number format";
      }
      if (!signupData.restaurant_location.trim()) {
        newErrors.restaurant_location = "Location is required";
      }
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
              placeholder="User Name"
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
            <select
              name="userType"
              className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-300"
              value={signupData.userType}
              onChange={handleChange}
              required
            >
              <option className=" bg-gray-900" value="">Select User Type</option>
              <option className=" bg-gray-900" value="restaurant">Donor</option>
              <option className=" bg-gray-900" value="ngo">NGO</option>
            </select>
            {errors.userType && (
              <p className="text-red-400 text-sm">{errors.userType}</p>
            )}

            {signupData.userType === "ngo" && (
              <>
                <input
                  type="text"
                  name="ngo_name"
                  placeholder="Ngo Name"
                  className="w-full p-3 rounded-lg bg-white/10 placeholder-white/70 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  value={signupData.ngo_name}
                  onChange={handleChange}
                />
                {errors.ngo_name && (
                  <p className="text-red-400 text-sm">
                    {errors.ngo_name}
                  </p>
                )}
                <input
                  type="text"
                  name="registration_number"
                  placeholder="Registration Number"
                  className="w-full p-3 rounded-lg bg-white/10 placeholder-white/70 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  value={signupData.registration_number}
                  onChange={handleChange}
                />
                {errors.registration_number && (
                  <p className="text-red-400 text-sm">
                    {errors.registration_number}
                  </p>
                )}
                <input
                  type="text"
                  name="ngo_phone"
                  placeholder="Phone Number"
                  className="w-full p-3 rounded-lg bg-white/10 placeholder-white/70 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  value={signupData.ngo_phone}
                  onChange={handleChange}
                />
                {errors.ngo_phone && (
                  <p className="text-red-400 text-sm">{errors.ngo_phone}</p>
                )}
                <input
                  type="text"
                  name="ngo_location"
                  placeholder="Ngo Location"
                  className="w-full p-3 rounded-lg bg-white/10 placeholder-white/70 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  value={signupData.ngo_location}
                  onChange={handleChange}
                />
                {errors.ngo_location && (
                  <p className="text-red-400 text-sm">{errors.ngo_location}</p>
                )}
              </>
            )}
            {signupData.userType === "restaurant" && (
              <>
                <input
                  type="text"
                  name="restaurant_name"
                  placeholder="Restaurant Name"
                  className="w-full p-3 rounded-lg bg-white/10 placeholder-white/70 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  value={signupData.restaurant_name}
                  onChange={handleChange}
                />
                {errors.restaurant_name && (
                  <p className="text-red-400 text-sm">
                    {errors.restaurant_name}
                  </p>
                )}
                <input
                  type="text"
                  name="license_number"
                  placeholder="License Number"
                  className="w-full p-3 rounded-lg bg-white/10 placeholder-white/70 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  value={signupData.license_number}
                  onChange={handleChange}
                />
                {errors.license_number && (
                  <p className="text-red-400 text-sm">
                    {errors.license_number}
                  </p>
                )}
                <input
                  type="text"
                  name="restaurant_phone"
                  placeholder="Phone Number"
                  className="w-full p-3 rounded-lg bg-white/10 placeholder-white/70 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  value={signupData.restaurant_phone}
                  onChange={handleChange}
                />
                {errors.restaurant_phone && (
                  <p className="text-red-400 text-sm">
                    {errors.restaurant_phone}
                  </p>
                )}
                <input
                  type="text"
                  name="restaurant_location"
                  placeholder="Restaurant Location"
                  className="w-full p-3 rounded-lg bg-white/10 placeholder-white/70 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  value={signupData.restaurant_location}
                  onChange={handleChange}
                />
                {errors.restaurant_location && (
                  <p className="text-red-400 text-sm">
                    {errors.restaurant_location}
                  </p>
                )}
              </>
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
