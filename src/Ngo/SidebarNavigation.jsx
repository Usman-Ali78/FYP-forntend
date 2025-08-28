import React from "react";
import {
  FaSearch,
  FaHandHoldingHeart,
  FaClipboardCheck,
  FaMapMarkerAlt,
  FaTimesCircle,
  FaBars,
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

const SidebarNavigation = ({ activeSection, setActiveSection }) => {
  const navTabs = [
    { key: "available", label: "Available Donations", icon: <FaSearch /> },
    { key: "my-claims", label: "My Claims", icon: <FaHandHoldingHeart /> },
    {
      key: "completed",
      label: "Completed Donations",
      icon: <FaClipboardCheck />,
    },
    { key: "map", label: "Donation Map", icon: <FaMapMarkerAlt /> },
    { key: "rejected", label: "Rejected Donations", icon: <FaTimesCircle /> },
    { key: "settings", label: "Settings", icon: <FiSettings /> },
  ];

  return (
    <aside className="w-full md:w-64 p-6 shadow-lg bg-white">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <FaBars /> NGO Dashboard
      </h2>
      <ul className="mt-6 space-y-2">
        {navTabs.map((tab) => (
          <li
            key={tab.key}
            className={`p-3 rounded cursor-pointer transition-all duration-200 flex items-center gap-2 ${
              activeSection === tab.key ? "bg-gray-300" : "hover:bg-gray-200"
            }`}
            onClick={() => setActiveSection(tab.key)}
          >
            {tab.icon} {tab.label}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarNavigation;