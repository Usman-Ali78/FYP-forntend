import React, { useState } from "react";
import { FiUsers, FiBox, FiMap, FiSettings, FiBarChart2, FiPieChart, FiMenu } from "react-icons/fi";
import { motion } from "framer-motion";

const Sidebar = ({ setActive, isSidebarOpen }) => {
  return (
    <div
      className={`fixed md:relative w-64 bg-gray-800 text-white h-screen flex-shrink-0 transform transition-transform duration-200 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 z-20`}
    >
      <h2 className="text-2xl font-bold p-6">Admin Dashboard</h2>
      <ul className="space-y-2 p-4">
        <li onClick={() => setActive("dashboard")} className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
          <FiBarChart2 className="mr-2" /> Dashboard
        </li>
        <li onClick={() => setActive("users")} className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
          <FiUsers className="mr-2" /> Manage Users
        </li>
        <li onClick={() => setActive("donations")} className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
          <FiBox className="mr-2" /> Manage Donations
        </li>
        <li onClick={() => setActive("reports")} className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
          <FiPieChart className="mr-2" /> Reports
        </li>
        <li onClick={() => setActive("map")} className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
          <FiMap className="mr-2" /> Map View
        </li>
        {/* <li onClick={() => setActive("settings")} className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
          <FiSettings className="mr-2" /> Settings
        </li> */}
      </ul>
    </div>
  );
};

const Dashboard = () => {
  const data = [
    { name: "Jan", donations: 40 },
    { name: "Feb", donations: 55 },
    { name: "Mar", donations: 75 },
    { name: "Apr", donations: 60 },
    { name: "May", donations: 80 },
    { name: "Jun", donations: 90 },
  ];

  // Top donors data
  const topDonors = [
    { rank: 1, name: "John Doe", amount: "$500" },
    { rank: 2, name: "Jane Smith", amount: "$450" },
    { rank: 3, name: "Alice Johnson", amount: "$400" },
    { rank: 4, name: "Bob Brown", amount: "$350" },
    { rank: 5, name: "Charlie Davis", amount: "$300" },
  ];

  // Animation variants for cards
  const cardVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { title: "Total Donations", value: "150", color: "bg-blue-500" },
          { title: "Active Users", value: "300", color: "bg-green-500" },
          { title: "Pending Requests", value: "10", color: "bg-yellow-500" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className={`p-6 rounded-lg shadow-lg text-white ${stat.color} cursor-pointer`}
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <h3 className="text-xl font-semibold">{stat.title}</h3>
            <p className="text-2xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Leaderboard - Top Donors */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Top Donors</h3>
        <div className="space-y-4">
          {topDonors.map((donor) => (
            <div
              key={donor.rank}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-bold text-gray-700">#{donor.rank}</span>
                  <span className="text-gray-800">{donor.name}</span>
                </div>
                <span className="text-green-600 font-bold">{donor.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



const ManageUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", blocked: false },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", blocked: false },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Moderator", blocked: true },
  ]);

  const toggleBlockUser = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, blocked: !user.blocked } : user
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <div className="font-semibold">{user.name} ({user.role})</div>
              <div className="text-sm text-gray-600">{user.email}</div>
            </div>
            <button
              onClick={() => toggleBlockUser(user.id)}
              className={`px-4 py-2 rounded text-white ${user.blocked ? 'bg-green-500' : 'bg-red-500'}`}
            >
              {user.blocked ? "Unblock" : "Block"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const ManageDonations = () => {
  const [donations, setDonations] = useState([
    { id: 1, donor: "Alice", item: "5kg Rice", status: "Pending", date: "2023-10-01" },
    { id: 2, donor: "Bob", item: "10 Bread Loaves", status: "Approved", date: "2023-10-02" },
    { id: 3, donor: "Charlie", item: "Vegetables", status: "Rejected", date: "2023-10-03" },
  ]);

  const [filterStatus, setFilterStatus] = useState("all");

  const filteredDonations = donations.filter((donation) =>
    filterStatus === "all" ? true : donation.status === filterStatus
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Donations</h2>
      <div className="mb-6">
        <label className="mr-2">Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div className="space-y-4">
        {filteredDonations.map((donation) => (
          <div key={donation.id} className="bg-white p-4 rounded-lg shadow">
            <div className="font-semibold">Donor: {donation.donor}</div>
            <div className="text-sm text-gray-600">Item: {donation.item}</div>
            <div className="text-sm text-gray-600">Status: {donation.status}</div>
            <div className="text-sm text-gray-600">Date: {donation.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
const Reports = () => {
  const donationStatusData = [
    { name: "Pending", value: 10, icon: "⏳", color: "yellow-500" },
    { name: "Approved", value: 20, icon: "✅", color: "green-500" },
    { name: "Rejected", value: 5, icon: "❌", color: "red-500" },
  ];

  const donationTrendsData = [
    { name: "Jan", donations: 40 },
    { name: "Feb", donations: 55 },
    { name: "Mar", donations: 75 },
    { name: "Apr", donations: 60 },
  ];

  const totalDonations = donationTrendsData.reduce((acc, curr) => acc + curr.donations, 0);
  const avgDonations = totalDonations / donationTrendsData.length;

  const lastMonthData = donationTrendsData[donationTrendsData.length - 1];
  const changeInDonations = lastMonthData.donations - donationTrendsData[donationTrendsData.length - 2]?.donations;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Reports and Analytics</h2>

      {/* Overall Donation Summary */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-6 text-gray-700">Overall Donation Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Donations</p>
            <p className="text-2xl font-bold text-blue-600">{totalDonations}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Change from Last Month</p>
            <p className="text-2xl font-bold text-green-600">
              {changeInDonations >= 0 ? "+" : ""}
              {changeInDonations}
            </p>
            <p className="text-sm text-gray-600">{changeInDonations >= 0 ? "Increase" : "Decrease"} from last month</p>
          </div>
        </div>
      </div>

      {/* Donation Status Distribution and Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Donation Status Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-6 text-gray-700">Donation Status Distribution</h3>
          <div className="space-y-4">
            {donationStatusData.map((status, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                <div className="flex items-center">
                  <span className={`text-2xl mr-3 text-${status.color}`}>{status.icon}</span>
                  <span className="text-gray-700">{status.name}</span>
                </div>
                <span className="text-gray-700 font-semibold">
                  {status.value} ({Math.round((status.value / totalDonations) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Donation Trends Over Time */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-6 text-gray-700">Donation Trends Over Time</h3>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-600">Average Donations per Month: {Math.round(avgDonations)}</h4>
            <div className="space-y-4">
              {donationTrendsData.map((month, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">{month.name}</span>
                    <span className="text-gray-700 font-semibold">{month.donations}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded h-2">
                    <div
                      className="h-2 rounded"
                      style={{ width: `${(month.donations / totalDonations) * 100}%`, backgroundColor: "#4F46E5" }}
                    ></div>
                  </div>
                  {index > 0 && (
                    <div className="text-sm text-gray-600 mt-2">
                      {month.donations > donationTrendsData[index - 1].donations ? "+" : ""}
                      {month.donations - donationTrendsData[index - 1].donations} from previous month
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const MapView = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Map View</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <p>Map will be displayed here.</p>
      </div>
    </div>
  );
};
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 right-4 p-2 bg-gray-800 text-white rounded md:hidden"
      >
        <FiMenu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <Sidebar setActive={setActiveTab} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "users" && <ManageUsers />}
        {activeTab === "donations" && <ManageDonations />}
        {activeTab === "reports" && <Reports />}
        {activeTab === "map" && <MapView />}
        {/* {activeTab === "settings" && <Settings />} */}
      </div>
    </div>
  );
};

export default AdminDashboard;