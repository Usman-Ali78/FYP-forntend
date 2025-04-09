import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  let navigate = useNavigate()

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Hero Section */}
      <div className="text-center py-12 bg-orange-600 text-white">
        <h1 className="text-5xl font-bold">Fighting Food Waste, Feeding the Hungry</h1>
        <p className="text-lg mt-4">Join us in reducing food waste and helping those in need.</p>
      </div>

      {/* Our Mission */}
      <section className="max-w-4xl mx-auto my-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
        <p className="text-gray-600 mt-4">
          We connect restaurants, hotels, and food businesses with NGOs to distribute surplus food 
          to those in need—minimizing waste and fighting hunger.
        </p>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center my-12">
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold">1. Donate Surplus Food</h3>
          <p className="text-gray-600">Restaurants and food businesses list extra food on our platform.</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold">2. Verified NGOs Collect</h3>
          <p className="text-gray-600">Our verified partners pick up and distribute the food safely.</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold">3. Help Those in Need</h3>
          <p className="text-gray-600">Meals reach families, homeless shelters, and communities in need.</p>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="bg-orange-700 text-white py-12 text-center">
        <h2 className="text-3xl font-bold">Our Impact</h2>
        <div className="flex justify-center gap-12 mt-6">
          <div>
            <h3 className="text-4xl font-bold">10,000+</h3>
            <p>Meals Donated</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">500+</h3>
            <p>Businesses Partnered</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">100+</h3>
            <p>NGOs Connected</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center my-12">
        <h2 className="text-3xl font-bold text-gray-800">Join Our Mission</h2>
        <p className="text-gray-600 mt-4">Be a part of the solution. Start donating food today!</p>
        <button 
        className="bg-orange-600 text-white px-6 py-3 rounded-lg mt-6 hover:bg-orange-700 duration-300 transition cursor-pointer font-semibold"
        onClick={()=> navigate("/LogIn")}
        >
          Get Started
        </button>
      </section>
    </div>
  );
};

export default About;
