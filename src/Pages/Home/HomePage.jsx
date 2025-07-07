import React from "react";
import mainImage from "../../assets/MainPage.jpg";
import image1 from "../../assets/Needy1.jfif"
import image2 from "../../assets/Needy2.jfif"
import image3 from "../../assets/Needy3.jfif"
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate()
  const handleClick = ()=>{
    navigate("/login")
  }


  return (
    <div className="bg-white w-full min-h-screen p-4 sm:p-6 md:p-8 lg:p-12">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">
            <span className="text-orange-500">Be The Reason</span> <br />
            Someone Smiles Today!
          </h1>
          <p className="text-gray-800 mt-4 text-sm sm:text-base lg:text-lg">
            "Every day, tons of food go to waste while many go hungry. Our
            platform connects food donors with charities, ensuring that good
            food reaches the right hands. Join us in making a difference!"
          </p>
          <button onClick={handleClick} className="mt-6 bg-orange-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-md hover:bg-orange-600 cursor-pointer transition duration-300">
            Donate Now →
          </button>
        </div>
        <div className="flex justify-center">
          <img
            src={mainImage}
            alt="Donation"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-[20%] object-contain"
          />
        </div>
      </div>

      {/* Needy People Section */}
      <div className="mt-12 sm:mt-16 text-center max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900">
          Your Donation Changes Lives
        </h2>
        <p className="text-gray-800 mt-2 text-sm sm:text-base lg:text-lg">
          See the impact of your generosity through these real stories.
        </p>
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[image1, image2, image3].map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-lg w-full h-48 sm:h-64 md:h-72 lg:h-80 mx-auto"
            >
              <img
                src={image}
                alt={`Needy Person ${index + 1}`}
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
                <p className="text-white font-semibold text-sm sm:text-base">
                  {index === 0 && "Your support brings hope"}
                  {index === 1 && "Every meal makes a difference"}
                  {index === 2 && "Together, we can end hunger"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center mt-12 sm:mt-16">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900">Why Choose Us?</h2>
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {["🌍 Global Impact", "🤝 Trusted by Communities", "📞 24/7 Support"].map((title, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-md w-full mx-auto"
            >
              <div className="text-orange-500 text-3xl sm:text-4xl">{title.split(" ")[0]}</div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mt-2 sm:mt-4">{title.split(" ").slice(1).join(" ")}</h3>
              <p className="text-gray-800 mt-2 text-sm sm:text-base lg:text-lg">
                {index === 0 && "Helping reduce food waste worldwide."}
                {index === 1 && "Working with verified NGOs and volunteers."}
                {index === 2 && "Dedicated team ready to assist you."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;