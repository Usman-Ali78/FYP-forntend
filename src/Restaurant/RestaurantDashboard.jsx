import React, { useState } from "react";
import {
  FaUtensils,
  FaClipboardList,
  FaMapMarkerAlt,
  FaCommentDots,
  FaChartBar,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import Donations from "../Components/Donation/Donations";
import Dashboard from "../Components/Donation/Dashboard";
import Map from "../Components/Donation/Map";
import Chat from "../Components/Donation/Chat";
import Notifications from "../Components/Donation/Notifications";
import Settings from "../Components/Donation/Settings";

const RestaurantDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 flex-col md:flex-row">
      {/* Sidebar Toggle Button for Mobile */}
      <button
        className="md:hidden z-50 p-4 text-gray-900"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <FaTimes size={24} className="text-white" />
        ) : (
          <FaBars size={24} />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white p-5 flex flex-col space-y-6 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative transition-transform duration-300 ease-in-out`}
      >
        <h2 className="text-2xl font-bold text-center md:text-left">
          Restaurant Dashboard
        </h2>
        <nav className="flex flex-col space-y-4">
          <button
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
            onClick={() => {
              setActiveTab("dashboard");
              setIsSidebarOpen(false);
            }}
          >
            <FaChartBar /> <span>Dashboard</span>
          </button>
          <button
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
            onClick={() => {
              setActiveTab("donations");
              setIsSidebarOpen(false);
            }}
          >
            <FaUtensils /> <span>Food Donations</span>
          </button>
          <button
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
            onClick={() => {
              setActiveTab("map");
              setIsSidebarOpen(false);
            }}
          >
            <FaMapMarkerAlt /> <span>NGOs Nearby</span>
          </button>
          <button
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
            onClick={() => {
              setActiveTab("chat");
              setIsSidebarOpen(false);
            }}
          >
            <FaCommentDots /> <span>Live Chat</span>
          </button>
          <button
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
            onClick={() => {
              setActiveTab("settings");
              setIsSidebarOpen(false);
            }}
          >
            <FaCog /> <span>Settings</span>
          </button>
          <button
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
            onClick={() => {
              setActiveTab("notifications");
              setIsSidebarOpen(false);
            }}
          >
            <MdNotifications /> <span>Notifications</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "donations" && <Donations />}
        {activeTab === "map" && <Map />}
        {activeTab === "chat" && <Chat/>}
        {activeTab === "settings" && <Settings />}
        {activeTab === "notifications" && <Notifications />}
      </main>
    </div>
  );
};

export default RestaurantDashboard;