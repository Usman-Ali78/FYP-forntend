import React, { useEffect, useRef, useState } from "react";
import {
  FaUtensils,
  FaClipboardList,
  FaMapMarkerAlt,
  FaCommentDots,
  FaChartBar,
  FaCog,
  FaBars,
  FaTimes,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaPlus,
} from "react-icons/fa";
import { MdNotifications } from "react-icons/md";

const RestaurantDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [donations, setDonations] = useState([
    {
      id: 1,
      name: "🍕 10 Pizzas",
      expiry: "Expiring in 2 hours",
      location: "Downtown",
      description: "Cheese and pepperoni pizzas.",
      status: "available",
    },
    {
      id: 2,
      name: "🥗 5 Salads",
      expiry: "Expiring in 4 hours",
      location: "Midtown",
      description: "Fresh green salads.",
      status: "claimed",
    },
  ]);
  const [formData, setFormData] = useState({
    name: "",
    expiry: "",
    location: "",
    description: "",
    status: "available",
  });
  const [editingId, setEditingId] = useState(null);
  const [donationToDelete, setDonationToDelete] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addDonation = (e) => {
    e.preventDefault();
    if (formData.name.trim() !== "") {
      if (editingId !== null) {
        setDonations(
          donations.map((donation) =>
            donation.id === editingId ? { ...donation, ...formData } : donation
          )
        );
        setEditingId(null);
      } else {
        setDonations([...donations, { id: Date.now(), ...formData }]);
      }
      setFormData({
        name: "",
        expiry: "",
        location: "",
        description: "",
        status: "available",
      });
      setIsFormModalOpen(false);
    }
  };

  const deleteDonation = (id) => {
    setDonations(donations.filter((donation) => donation.id !== id));
    setDonationToDelete(null);
  };

  const editDonation = (donation) => {
    setFormData({
      name: donation.name,
      expiry: donation.expiry,
      location: donation.location,
      description: donation.description,
      status: donation.status,
    });
    setEditingId(donation.id);
    setIsFormModalOpen(true);
  };

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch = donation.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || donation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "claimed":
        return "bg-blue-100 text-blue-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const recentActivity = [
    {
      id: 1,
      type: "Donation",
      description: "10 Pizzas donated to NGO XYZ",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "Pickup",
      description: "5 Salads picked up by NGO ABC",
      time: "4 hours ago",
    },
  ];

  //request section
  const [requests, setRequests] = useState([
    { id: 1, ngo: "NGO XYZ", time: "Pickup in 1 hour", status: "Pending" },
    { id: 2, ngo: "NGO ABC", time: "Pickup in 3 hours", status: "Pending" },
  ]);

  const handleRequestAction = (id, status) => {
    setRequests(
      requests.map((req) => (req.id === id ? { ...req, status } : req))
    );
  };

  //Chat Section
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { sender: "You", text: newMessage }]);
      setNewMessage("");
    }
  };

  //Ngo's Section
  const [ngosNearby, setNgosNearby] = useState([
    { id: 1, name: "NGO Help", distance: "2.5 km" },
    { id: 2, name: "Food Aid", distance: "3.1 km" },
    { id: 3, name: "Hunger Relief", distance: "4.2 km" },
  ]);

  //Setting Section
  const [settings, setSettings] = useState({
    restaurantName: "My Restaurant",
    contact: "123-456-7890",
    address: "123 Main St, City",
    notifications: true,
    theme: "light",
  });

  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({ ...settings, [name]: type === "checkbox" ? checked : value });
  };

  // Add a notifications state
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New pickup request from NGO XYZ", time: "2 hours ago" },
    { id: 2, message: "Donation claimed by NGO ABC", time: "4 hours ago" },
  ]);

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
            onClick={() =>
              setActiveTab("dashboard", setIsSidebarOpen(!isSidebarOpen))
            }
          >
            <FaChartBar /> <span>Dashboard</span>
          </button>
          <button
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
            onClick={() =>
              setActiveTab("donations", setIsSidebarOpen(!isSidebarOpen))
            }
          >
            <FaUtensils /> <span>Food Donations</span>
          </button>
          <button
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
            onClick={() =>
              setActiveTab("requests", setIsSidebarOpen(!isSidebarOpen))
            }
          >
            <FaClipboardList /> <span>Pickup Requests</span>
          </button>
          <button
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
            onClick={() =>
              setActiveTab("map", setIsSidebarOpen(!isSidebarOpen))
            }
          >
            <FaMapMarkerAlt /> <span>NGOs Nearby</span>
          </button>
          <button
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
            onClick={() =>
              setActiveTab("chat", setIsSidebarOpen(!isSidebarOpen))
            }
          >
            <FaCommentDots /> <span>Live Chat</span>
          </button>
          <button
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
            onClick={() =>
              setActiveTab("settings", setIsSidebarOpen(!isSidebarOpen))
            }
          >
            <FaCog /> <span>Settings</span>
          </button>

          <button
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
            onClick={() =>
              setActiveTab("notifications", setIsSidebarOpen(!isSidebarOpen))
            }
          >
            <MdNotifications /> <span>Notifications</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-5 shadow rounded-xl">
                📦 Total Donations: 120
              </div>
              <div className="bg-white p-5 shadow rounded-xl">
                🚚 Pending Pickups: 5
              </div>
              <div className="bg-white p-5 shadow rounded-xl">
                🌍 Impact: 250 Meals Served
              </div>
            </div>
            <div className="bg-white p-5 shadow rounded-xl mb-6">
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <ul className="space-y-2">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="p-3 bg-gray-100 rounded">
                    <span className="font-semibold">{activity.type}:</span>{" "}
                    {activity.description}{" "}
                    <span className="text-gray-500">{activity.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-5 shadow rounded-xl mb-6">
              <h3 className="text-xl font-semibold mb-4">Impact Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-100 rounded-lg">
                  <p className="text-lg font-semibold">🌍 CO2 Reduced</p>
                  <p className="text-2xl">500 kg</p>
                </div>
                <div className="p-4 bg-blue-100 rounded-lg">
                  <p className="text-lg font-semibold">🍴 Meals Served</p>
                  <p className="text-2xl">1,200</p>
                </div>
                <div className="p-4 bg-yellow-100 rounded-lg">
                  <p className="text-lg font-semibold">🚮 Food Waste Saved</p>
                  <p className="text-2xl">750 kg</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "donations" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Manage Food Donations</h2>

            {/* Search and Filter Bar */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center bg-white p-2 rounded-lg shadow-sm w-1/2">
                <FaSearch className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search donations..."
                  className="outline-none w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center bg-white p-2 rounded-lg shadow-sm">
                <FaFilter className="text-gray-400 mr-2" />
                <select
                  className="outline-none"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="available">Available</option>
                  <option value="claimed">Claimed</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
              <button
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
                onClick={() => setIsFormModalOpen(true)}
              >
                <FaPlus className="mr-2" />
                Add Donation
              </button>
            </div>

            {/* Donation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDonations.map((donation) => (
                <div
                  key={donation.id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">{donation.name}</h3>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${getStatusBadgeColor(
                        donation.status
                      )}`}
                    >
                      {donation.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{donation.description}</p>
                  <p className="text-gray-500 text-sm mb-2">
                    📍 {donation.location}
                  </p>
                  <p className="text-gray-500 text-sm">⏳ {donation.expiry}</p>
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      className="text-blue-500 hover:text-blue-700 transition-all"
                      onClick={() => editDonation(donation)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 transition-all"
                      onClick={() => setDonationToDelete(donation)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add/Edit Donation Modal */}
            {isFormModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
                  <h3 className="text-xl font-semibold mb-4">
                    {editingId ? "Edit Donation" : "Add New Donation"}
                  </h3>
                  <form onSubmit={addDonation} className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Food Name"
                      className="border p-2 w-full rounded-lg"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="expiry"
                      placeholder="Expiry Time"
                      className="border p-2 w-full rounded-lg"
                      value={formData.expiry}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="location"
                      placeholder="Pickup Location"
                      className="border p-2 w-full rounded-lg"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                    <textarea
                      name="description"
                      placeholder="Description"
                      className="border p-2 w-full rounded-lg"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
                        onClick={() => setIsFormModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
                      >
                        {editingId ? "Update Donation" : "Add Donation"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Delete Confirmation Modal */}
            {donationToDelete && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg">
                  <p className="mb-4">
                    Are you sure you want to delete "{donationToDelete.name}"?
                  </p>
                  <div className="flex justify-end space-x-2">
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
                      onClick={() => setDonationToDelete(null)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                      onClick={() => deleteDonation(donationToDelete.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Other Tabs (Requests, Map, Chat, Settings) */}
        {activeTab === "requests" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Pickup Requests</h2>
            <div className="bg-white p-5 shadow rounded-xl">
              <p className="text-lg mb-4">
                Manage all food pickup requests from NGOs.
              </p>
              <ul className="mt-2 space-y-2">
                {requests.map((request) => (
                  <li
                    key={request.id}
                    className="p-3 bg-gray-200 rounded flex justify-between items-center"
                  >
                    <span className="font-semibold">
                      🚛 {request.ngo} - {request.time}
                    </span>
                    <div className="space-x-2">
                      {request.status === "Pending" ? (
                        <>
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded"
                            onClick={() =>
                              handleRequestAction(request.id, "Accepted")
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded"
                            onClick={() =>
                              handleRequestAction(request.id, "Rejected")
                            }
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span
                          className={`px-3 py-1 rounded ${
                            request.status === "Accepted"
                              ? "bg-green-300"
                              : "bg-red-300"
                          }`}
                        >
                          {request.status}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "map" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Partnered NGOs</h2>
            <div className="bg-white p-5 shadow rounded-xl">
              <p className="text-lg mb-4">
                NGOs you are currently partnered with.
              </p>
              <ul className="mt-2 space-y-2">
                {ngosNearby.map((ngo) => (
                  <li
                    key={ngo.id}
                    className="p-3 bg-gray-200 rounded flex justify-between items-center"
                  >
                    <div>
                      <span className="font-semibold">📍 {ngo.name}</span>
                      <p className="text-sm text-gray-500">
                        {ngo.distance} away
                      </p>
                    </div>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded">
                      Contact
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "chat" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Live Chat</h2>
            <div className="bg-white p-5 shadow rounded-xl h-96 flex flex-col">
              <div className="flex-1 overflow-y-auto p-2 border-b">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-2 my-1 rounded w-fit ${
                      msg.sender === "You"
                        ? "bg-blue-500 text-white self-end"
                        : "bg-gray-300 text-black self-start"
                    }`}
                  >
                    <strong>{msg.sender}:</strong> {msg.text}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="flex p-2">
                <input
                  type="text"
                  className="flex-1 p-2 border rounded"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  className="bg-blue-500 text-white px-4 ml-2 rounded"
                  onClick={sendMessage}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <div className="bg-white p-5 shadow rounded-xl">
              <label className="block mb-2">Restaurant Name:</label>
              <input
                type="text"
                name="restaurantName"
                value={settings.restaurantName}
                onChange={handleSettingsChange}
                className="w-full p-2 border rounded mb-4"
              />
              <label className="block mb-2">Contact:</label>
              <input
                type="text"
                name="contact"
                value={settings.contact}
                onChange={handleSettingsChange}
                className="w-full p-2 border rounded mb-4"
              />
              <label className="block mb-2">Address:</label>
              <input
                type="text"
                name="address"
                value={settings.address}
                onChange={handleSettingsChange}
                className="w-full p-2 border rounded mb-4"
              />
              <label className="block mb-2">Notifications:</label>
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleSettingsChange}
                className="mr-2"
              />{" "}
              Enable Notifications
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Notifications</h2>
            <div className="bg-white p-5 shadow rounded-xl">
              <ul className="space-y-2">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="p-3 bg-gray-100 rounded flex justify-between items-center"
                  >
                    <span>{notification.message}</span>
                    <span className="text-gray-500 text-sm">
                      {notification.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default RestaurantDashboard;
