import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", tel: "", message: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.tel) {
      newErrors.tel = "Phone number is required";
    } else if (formData.tel.length < 11) {
      newErrors.tel = "Phone number must be at least 11 characters";
    }
    if (!formData.message) newErrors.message = "Message cannot be empty";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
      setFormData({ name: "", email: "", tel: "", message: "" });
    }
  };

  return (
    <div className="relative flex items-top justify-center min-h-[700px] bg-white sm:items-center sm:pt-0">
      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
        <div className="mt-8 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 mr-2 bg-gray-100 sm:rounded-lg">
              <h1 className="text-3xl sm:text-4xl text-gray-800 font-extrabold tracking-tight">
                Get in touch:
              </h1>
              <p className="text-lg sm:text-xl font-medium text-gray-600 mt-2">
                Fill in the form to start a conversation
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col justify-center">
              <div className="flex flex-col">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-2 py-3 px-3 rounded-lg border border-gray-400 focus:border-orange-500 focus:outline-none"
                  placeholder="Full Name"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div className="flex flex-col mt-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-2 py-3 px-3 rounded-lg border border-gray-400 focus:border-orange-500 focus:outline-none"
                  placeholder="Email"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="flex flex-col mt-2">
                <label htmlFor="tel">Telephone Number</label>
                <input
                  type="tel"
                  name="tel"
                  id="tel"
                  value={formData.tel}
                  onChange={handleChange}
                  className="w-full mt-2 py-3 px-3 rounded-lg border border-gray-400 focus:border-orange-500 focus:outline-none"
                  placeholder="Telephone Number"
                />
                {errors.tel && <p className="text-red-500 text-sm">{errors.tel}</p>}
              </div>

              <div className="flex flex-col mt-2">
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full mt-2 py-3 px-3 rounded-lg border border-gray-400 focus:border-orange-500 focus:outline-none"
                  placeholder="Your message..."
                  rows="4"
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="md:w-32 bg-orange-700 text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
