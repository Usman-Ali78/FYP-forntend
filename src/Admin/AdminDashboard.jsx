import React, { useState, useEffect, useMemo } from "react";
import {
  FiUsers,
  FiBox,
  FiMap,
  FiBarChart2,
  FiPieChart,
  FiMenu,
} from "react-icons/fi";
import {
  FaUtensils,
  FaHamburger,
  FaWeight,
  FaMapPin,
  FaCalendarDay,
  FaTag,
  FaUsers,
  FaUser,
  FaEnvelope,
  FaLock,
  FaUnlock,
  FaStar,
  FaFilter,
} from "react-icons/fa";
import { motion } from "framer-motion";
import api from "../../api/api";
import { User } from "lucide-react";
import useDonations from "../hooks/useDonations";
import LoadingSpinner from "../Components/LoadingSpinner";

const Sidebar = ({ setActive, isSidebarOpen }) => {
  return (
    <div
      className={`fixed md:relative w-64 bg-gray-800 text-white h-screen flex-shrink-0 transform transition-transform duration-200 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 z-20`}
    >
      <h2 className="text-2xl font-bold p-6">Admin Dashboard</h2>
      <ul className="space-y-2 p-4">
        <li
          onClick={() => setActive("dashboard")}
          className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
        >
          <FiBarChart2 className="mr-2" /> Dashboard
        </li>
        <li
          onClick={() => setActive("users")}
          className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
        >
          <FiUsers className="mr-2" /> Manage Users
        </li>
        <li
          onClick={() => setActive("donations")}
          className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
        >
          <FiBox className="mr-2" /> Manage Donations
        </li>
        <li
          onClick={() => setActive("reports")}
          className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
        >
          <FiPieChart className="mr-2" /> Reports
        </li>
        <li
          onClick={() => setActive("map")}
          className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
        >
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
  const [donations, setDonations] = useState([]);
  const [users, setUsers] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found");
      return;
    }

    try {
      const [donationRes, userRes, claimRes] = await Promise.all([
        api.get("/admin/donations", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        api.get("/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        api.get("/admin/claims", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setDonations(donationRes.data);
      setUsers(userRes.data);
      setClaims(claimRes.data);
    } catch (error) {
      console.error("❌ Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const pendingRequest = claims.filter((claim) => claim.status === "pending");

  const [topDonor, setTopDonors] = useState([]);

  useEffect(() => {
    const fetchTopDonors = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await api.get("/admin/top-donors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTopDonors(data);
      } catch (err) {
        console.error("Error fetching top donors:", err);
      }
    };

    fetchTopDonors();
  }, []);

  if (loading) return <LoadingSpinner />;

  // Animation variants for cards
  const cardVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Dashboard Overview
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          {
            title: "Total Donations",
            value: donations.length,
            color: "bg-blue-500",
          },
          { title: "Active Users", value: users.length, color: "bg-green-500" },
          {
            title: "Pending Requests",
            value: pendingRequest.length,
            color: "bg-yellow-500",
          },
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
          {topDonor.map((donor, index) => (
            <div
              key={donor.donorId}
              className="p-5 bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {donor.name}
                    </p>
                    <p className="text-sm text-gray-500">{donor.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Donations</p>
                  <p className="text-xl font-bold text-green-600">
                    {donor.totalDonations}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


import { toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const { data } = await api.get("/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(data);
      } catch (error) {
        toast.error("Failed to fetch users.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await api.get("/reviews/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(data);
      } catch (error) {
        toast.error("Failed to fetch reviews.");
      }
    };
    fetchReviews();
  }, []);

  // Calculate average stars for a restaurant
  const getAverageStars = (restaurantId) => {
    const userReviews = reviews.filter(
      (r) => r.restaurant && r.restaurant._id === restaurantId
    );
    if (userReviews.length === 0) return 0;
    const avg =
      userReviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
      userReviews.length;
    return avg;
  };

  const toggleBlock = async (id, isBlocked) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await api.put(
        `/admin/users/${id}/block`,
        { block: !isBlocked },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers((prev) =>
        prev.map((u) =>
          u._id === id ? { ...u, blocked: data.data.blocked } : u
        )
      );

      toast.success(data.message);
    } catch (error) {
      toast.error("Failed to update user status.");
    }
  };

  // Filter users (excluding admins)
  const filteredUsers = users.filter(
    (u) =>
      u.userType !== "admin" &&
      (filter === "all" || u.userType === filter)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
          <p className="text-gray-600 mt-2">View and manage all system users</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaFilter className="text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Filter by:</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === "all"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Users
              </button>
              <button
                onClick={() => setFilter("restaurant")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === "restaurant"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Restaurants
              </button>
              <button
                onClick={() => setFilter("ngo")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === "ngo"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                NGOs
              </button>
            </div>
          </div>
        </div>

        {/* Users List */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all border border-gray-100 flex flex-col"
              >
                {/* User Info */}
                <div className="flex-grow mb-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
                      <p className="text-sm text-gray-600 mt-1">{user.email}</p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {user.userType}
                    </span>
                  </div>

                  {/* Show rating only for restaurants */}
                  {user.userType === "restaurant" && (
                    <div className="mt-4 flex items-center">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < Math.round(getAverageStars(user._id))
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                            size={16}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {getAverageStars(user._id).toFixed(1)} / 5
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Button - Now consistently at the bottom */}
                <div className="mt-auto pt-4">
                  <button
                    onClick={() => toggleBlock(user._id, user.blocked)}
                    className={`w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
                      user.blocked
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                  >
                    {user.blocked ? (
                      <>
                        <FaUnlock size={14} /> Unblock User
                      </>
                    ) : (
                      <>
                        <FaLock size={14} /> Block User
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center rounded-full bg-gray-100 p-4 mb-4">
              <FaFilter className="text-gray-500 text-xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No users found</h3>
            <p className="text-gray-500">Try changing your filter settings</p>
          </div>
        )}
      </div>
    </div>
  );
};


const ManageDonations = () => {
  const { donations } = useDonations();
  const sortedDonations = useMemo(() => {
    return donations.sort((a, b) => {
      const statusOrder = {
        available: 1,
        delivered: 2,
        pending_pickup: 3,
        expired: 4,
      };
      return (statusOrder[a.status] || 5) - (statusOrder[b.status] || 5);
    });
  }, [donations]);

  const [filterStatus, setFilterStatus] = useState("all");

  const filteredDonations = sortedDonations.filter((donation) =>
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
          <option value="available">Availabe</option>
          <option value="delivered">Delivered</option>
          <option value="expired">Expired</option>
        </select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDonations.map((donation) => (
          <div
            key={donation._id}
            className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-5">
              <div className="flex items-center mb-4">
                <div className="bg-amber-50 p-2 rounded-lg mr-3">
                  <FaUtensils className="text-amber-500 text-xl" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg">
                  {donation.donor.restaurant_name
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </h3>
              </div>

              <div className="space-y-3 text-gray-600">
                <div className="flex items-center">
                  <FaHamburger className=" mr-2" />
                  <span>{donation.item}</span>
                </div>

                <div className="flex items-center">
                  <FaWeight className=" mr-2" />{" "}
                  {/* Changed from FaBalanceScale to FaWeight for quantity */}
                  <span>
                    {donation.quantity} {donation.unit}
                  </span>
                </div>

                <div className="flex items-center">
                  <FaMapPin className=" mr-2" />{" "}
                  {/* Changed from FaMapMarkerAlt to FaMapPin for pickup address */}
                  <span className="truncate">{donation.pickup_address}</span>
                </div>

                <div className="flex items-center">
                  <FaCalendarDay className=" mr-2" />{" "}
                  {/* Changed from FaCalendarAlt to FaCalendarDay for date */}
                  <span>
                    {new Date(donation.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center">
                  <FaTag className=" mr-2" />{" "}
                  {/* Unchanged, FaTag fits well for status */}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      donation.status === "available"
                        ? "bg-green-400 text-white"
                        : donation.status === "delivered"
                        ? "bg-blue-400 text-white"
                        : donation.status === "pending_pickup"
                        ? "bg-yellow-400 text-yellow-900"
                        : donation.status === "expired"
                        ? "bg-red-400 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {donation.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Reports = () => {
  const [donationStatusData, setDonationStatusData] = useState([]);
  const [changeInDonations, setChangeInDonations] = useState(0);
  const [donationTrendsData, setDonationTrendsData] = useState([]);
  const { donations } = useDonations();

  useEffect(() => {
    if (!donations || donations.length === 0) return;

    const now = new Date();
    const thisMonth = now.getMonth();
    const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
    const thisYear = now.getFullYear();
    const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;

    // --- Count donations this month and last month ---
    const thisMonthDonations = donations.filter((d) => {
      const date = new Date(d.createdAt);
      return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
    });

    const lastMonthDonations = donations.filter((d) => {
      const date = new Date(d.createdAt);
      return (
        date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear
      );
    });

    const thisMonthTotal = thisMonthDonations.length;
    const lastMonthTotal = lastMonthDonations.length;

    const change =
      lastMonthTotal === 0
        ? thisMonthTotal > 0
          ? 100
          : 0
        : Math.round(
            ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100
          );

    setChangeInDonations(change);

    // --- Status counts (from API) ---
    const expired = donations.filter((d) => d.status === "expired").length;
    const delivered = donations.filter((d) => d.status === "delivered").length;
    const available = donations.filter((d) => d.status === "available").length;

    setDonationStatusData([
      { name: "Available", value: available, color: "yellow-500", icon: "⏳" },
      { name: "Delivered", value: delivered, color: "green-500", icon: "✅" },
      { name: "Expired", value: expired, color: "red-500", icon: "⏰" },
    ]);

    // --- Monthly trends (last 4 months only) ---
    const last4Months = Array.from({ length: 4 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      return { key: `${d.getMonth()}-${d.getFullYear()}`, label: d };
    }).reverse();

    // Count donations for those months
    const monthCounts = {};
    donations.forEach((d) => {
      const date = new Date(d.createdAt);
      const key = `${date.getMonth()}-${date.getFullYear()}`;
      monthCounts[key] = (monthCounts[key] || 0) + 1;
    });

    // Map into chart data
    const monthlyData = last4Months.map((m) => ({
      name: m.label.toLocaleString("default", {
        month: "short",
        year: "numeric",
      }), // e.g. "Aug 2025"
      donations: monthCounts[m.key] || 0,
    }));

    setDonationTrendsData(monthlyData);
  }, [donations]);

  const totalDonations = donations.length;
  const totalDonation = donationTrendsData.reduce(
    (acc, curr) => acc + curr.donations,
    0
  );
  const avgDonations =
    donationTrendsData.length > 0
      ? totalDonations / donationTrendsData.length
      : 0;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Reports and Analytics
      </h2>

      {/* Overall Donation Summary */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-6 text-gray-700">
          Overall Donation Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Donations</p>
            <p className="text-2xl font-bold text-blue-600">
              {donations.length}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Change from Last Month</p>
            <p
              className={`text-2xl font-bold ${
                changeInDonations >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {changeInDonations >= 0 ? "+" : ""}
              {changeInDonations}%
            </p>
            <p className="text-sm text-gray-600">
              {changeInDonations >= 0 ? "Increase" : "Decrease"} from last month
            </p>
          </div>
        </div>
      </div>

      {/* Donation Status Distribution and Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Donation Status Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-6 text-gray-700">
            Donation Status Distribution
          </h3>
          <div className="space-y-4">
            {donationStatusData.map((status, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
              >
                <div className="flex items-center">
                  <span className={`text-2xl mr-3 text-${status.color}`}>
                    {status.icon}
                  </span>
                  <span className="text-gray-700">{status.name}</span>
                </div>
                <span className="text-gray-700 font-semibold">
                  {status.value} (
                  {totalDonations > 0
                    ? Math.round((status.value / totalDonations) * 100)
                    : 0}
                  %)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Donation Trends Over Time */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-6 text-gray-700">
            Donation Trends (Past 4 Months)
          </h3>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-600">
              Average Donations: {Math.round(avgDonations)}
            </h4>
            <div className="space-y-4">
              {donationTrendsData.map((month, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">{month.name}</span>
                    <span className="text-gray-700 font-semibold">
                      {month.donations}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded h-2">
                    <div
                      className="h-2 rounded"
                      style={{
                        width: `${
                          totalDonation > 0
                            ? (month.donations / totalDonation) * 100
                            : 0
                        }%`,
                        backgroundColor: "#4F46E5",
                      }}
                    ></div>
                  </div>
                  {index > 0 && (
                    <div className="text-sm text-gray-600 mt-2">
                      {month.donations > donationTrendsData[index - 1].donations
                        ? "+"
                        : ""}
                      {month.donations -
                        donationTrendsData[index - 1].donations}{" "}
                      from previous month
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
      <Sidebar
        setActive={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

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
