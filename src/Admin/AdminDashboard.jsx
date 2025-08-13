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

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await api.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = users.filter((user) => user.userType !== "admin");

  const toggleBlockUser = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, blocked: !user.blocked } : user
      )
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-2 flex items-center">
        <FaUsers className="mr-2 text-blue-500" size={24} />
        Manage Users
      </h2>

      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex justify-between items-center border-l-4 border-blue-500"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 text-blue-600 rounded-full p-3">
                <FaUser size={20} />
              </div>
              <div>
                <div className="font-semibold text-lg text-gray-800">
                  {user.userType === "ngo"
                    ? user.ngo_name
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")
                    : user.restaurant_name
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                  <span className="ml-2 text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                    {user.userType}
                  </span>
                </div>
                <div className="text-sm text-gray-600 flex items-center mt-1">
                  <FaEnvelope className="mr-1" size={14} />
                  {user.email}
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleBlockUser(user.id)}
              className={`px-4 py-2 rounded-full text-white font-medium transition-all duration-200 flex items-center space-x-1 ${
                user.blocked
                  ? "bg-green-500 hover:bg-green-600 shadow-green"
                  : "bg-red-500 hover:bg-red-600 shadow-red"
              } shadow-md hover:shadow-lg`}
            >
              {user.blocked ? (
                <>
                  <FaUnlock size={16} />
                  <span>Unblock User</span>
                </>
              ) : (
                <>
                  <FaLock size={16} />
                  <span>Block User</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState({
//     users: false,
//     blocking: {}, // Track blocking state per user
//   });
//   const [error, setError] = useState(null);

//   const getUsers = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       setLoading((prev) => ({ ...prev, users: true }));
//       const { data } = await api.get("/admin/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(data);
//     } catch (err) {
//       setError("Failed to fetch users");
//       console.error(err);
//     } finally {
//       setLoading((prev) => ({ ...prev, users: false }));
//     }
//   };

//   useEffect(() => {
//     getUsers();
//   }, []);

//   const toggleBlockUser = async (userId) => {
//     let blockStatus; // Declare at the function scope

//     try {
//       const token = localStorage.getItem("token");
//       const user = users.find((u) => u._id === userId);
//       blockStatus = !user.blocked; // Assign value

//       // Optimistic UI update
//       setUsers((prevUsers) =>
//         prevUsers.map((u) =>
//           u._id === userId ? { ...u, blocked: blockStatus } : u
//         )
//       );

//       // Update loading state
//       setLoading((prev) => ({
//         ...prev,
//         blocking: { ...prev.blocking, [userId]: true },
//       }));

//       await api.put(
//         `/api/admin/users/${userId}/block`,
//         { block: blockStatus },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     } catch (err) {
//       // Revert on error - now blockStatus is accessible
//       setUsers((prevUsers) =>
//         prevUsers.map((u) =>
//           u._id === userId ? { ...u, blocked: !blockStatus } : u
//         )
//       );
//       setError(`Failed to ${blockStatus ? "block" : "unblock"} user`);
//       console.error(err);
//     } finally {
//       setLoading((prev) => ({
//         ...prev,
//         blocking: { ...prev.blocking, [userId]: false },
//       }));
//     }
//   };

//   const filteredUsers = users.filter((user) => user.userType !== "admin");

//   if (loading.users && users.length === 0) {
//     return (
//       <div className="flex justify-center p-8">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 text-red-500 bg-red-50 rounded-md mx-auto max-w-4xl">
//         {error}
//         <button
//           onClick={getUsers}
//           className="ml-4 text-blue-500 hover:underline"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-2 flex items-center">
//         <FaUsers className="mr-2 text-blue-500" size={24} />
//         Manage Users
//       </h2>

//       {error && (
//         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//           {error}
//           <button
//             onClick={() => setError(null)}
//             className="float-right text-red-700 hover:underline"
//           >
//             Dismiss
//           </button>
//         </div>
//       )}

//       <div className="space-y-4">
//         {filteredUsers.map((user) => (
//           <div
//             key={user._id}
//             className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex justify-between items-center border-l-4 border-blue-500"
//           >
//             <div className="flex items-center space-x-4">
//               <div className="bg-blue-100 text-blue-600 rounded-full p-3">
//                 <FaUser size={20} />
//               </div>
//               <div>
//                 <div className="font-semibold text-lg text-gray-800">
//                   {user.userType === "ngo"
//                     ? user.ngo_name
//                         .split(" ")
//                         .map(
//                           (word) => word.charAt(0).toUpperCase() + word.slice(1)
//                         )
//                         .join(" ")
//                     : user.restaurant_name
//                         .split(" ")
//                         .map(
//                           (word) => word.charAt(0).toUpperCase() + word.slice(1)
//                         )
//                         .join(" ")}
//                   <span className="ml-2 text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
//                     {user.userType}
//                   </span>
//                 </div>
//                 <div className="text-sm text-gray-600 flex items-center mt-1">
//                   <FaEnvelope className="mr-1" size={14} />
//                   {user.email}
//                 </div>
//               </div>
//             </div>
//             <button
//               onClick={() => toggleBlockUser(user._id)}
//               disabled={loading.blocking[user._id]}
//               className={`px-4 py-2 rounded-full text-white font-medium transition-all duration-200 flex items-center space-x-1 ${
//                 user.blocked
//                   ? "bg-green-500 hover:bg-green-600"
//                   : "bg-red-500 hover:bg-red-600"
//               } shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
//             >
//               {loading.blocking[user._id] ? (
//                 <span>Processing...</span>
//               ) : user.blocked ? (
//                 <>
//                   <FaUnlock size={16} />
//                   <span>Unblock</span>
//                 </>
//               ) : (
//                 <>
//                   <FaLock size={16} />
//                   <span>Block</span>
//                 </>
//               )}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

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

  const totalDonations = donationTrendsData.reduce(
    (acc, curr) => acc + curr.donations,
    0
  );
  const avgDonations = totalDonations / donationTrendsData.length;

  const lastMonthData = donationTrendsData[donationTrendsData.length - 1];
  const changeInDonations =
    lastMonthData.donations -
    donationTrendsData[donationTrendsData.length - 2]?.donations;

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
            <p className="text-2xl font-bold text-blue-600">{totalDonations}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Change from Last Month</p>
            <p className="text-2xl font-bold text-green-600">
              {changeInDonations >= 0 ? "+" : ""}
              {changeInDonations}
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
                  {Math.round((status.value / totalDonations) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Donation Trends Over Time */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-6 text-gray-700">
            Donation Trends Over Time
          </h3>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-600">
              Average Donations per Month: {Math.round(avgDonations)}
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
                        width: `${(month.donations / totalDonations) * 100}%`,
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
