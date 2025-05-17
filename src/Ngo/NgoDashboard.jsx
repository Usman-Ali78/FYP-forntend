
import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaCheck, FaTimes, FaBars, FaBell, FaClipboardCheck, FaUser, FaSearch } from "react-icons/fa";

function NgoDashboard() {
  const [donationList, setDonationList] = useState([
    { id: 1, donor: "John Doe", location: "NYC", quantity: "10 meals", expires: "2 hours", accepted: false, foodType: "Vegetarian", instructions: "No nuts" },
    { id: 2, donor: "Jane Smith", location: "LA", quantity: "15 meals", expires: "5 hours", accepted: false, foodType: "Non-Vegetarian", instructions: "Gluten-free" },
  ]);
  const [history, setHistory] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activeSection, setActiveSection] = useState("pending");
  const [profile] = useState({ name: "NGO Admin", role: "Manager" });
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDonationList((prev) =>
        prev.map((donation) => ({
          ...donation,
          expires: donation.expires === "1 hour" ? "Expired" : `${parseInt(donation.expires) - 1} hours`,
        }))
      );
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const handleAccept = (id) => {
    const updatedDonations = donationList.map((donation) =>
      donation.id === id ? { ...donation, accepted: true } : donation
    );
    setDonationList(updatedDonations);
    const acceptedDonation = donationList.find((d) => d.id === id);
    setHistory([...history, { ...acceptedDonation, completedAt: new Date().toLocaleString() }]);
    setNotifications([...notifications, `Accepted donation from ${acceptedDonation.donor}`]);
  };

  const handleReject = (id) => {
    setDonationList(donationList.filter((donation) => donation.id !== id));
    const rejectedDonation = donationList.find((d) => d.id === id);
    setNotifications([...notifications, `Rejected donation from ${rejectedDonation.donor}`]);
  };

  const handleMarkAsRead = () => {
    setNotifications([]);
    setShowNotifications(false); // Close the notifications dropdown after marking as read
  };

  const filteredDonations = donationList.filter(
    (donation) =>
      donation.donor.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (activeSection === "pending" ? !donation.accepted : donation.accepted)
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-full md:w-64 p-6 shadow-lg flex flex-col justify-between bg-white">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaBars className="h-5 w-5" /> NGO Dashboard
          </h2>
          <ul className="mt-6 space-y-2">
            <li
              className={`p-3 rounded cursor-pointer ${activeSection === "pending" ? "bg-gray-300" : "hover:bg-gray-200"}`}
              onClick={() => setActiveSection("pending")}
            >
              Pending Donations
            </li>
            <li
              className={`p-3 rounded cursor-pointer ${activeSection === "completed" ? "bg-gray-300" : "hover:bg-gray-200"}`}
              onClick={() => setActiveSection("completed")}
            >
              Completed Donations
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <div className="p-3 text-sm text-gray-500">© 2025 Food Donation Platform</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Food Donations</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FaUser className="h-5 w-5" /> {profile.name} ({profile.role})
            </div>
            <div className="relative">
              <FaBell
                className="h-6 w-6 cursor-pointer hover:text-gray-700"
                onClick={() => setShowNotifications(!showNotifications)}
              />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {notifications.length}
                </span>
              )}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 shadow-lg rounded-lg p-4 bg-white z-50">
                  <h3 className="font-semibold">Notifications</h3>
                  {notifications.length === 0 ? (
                    <p className="text-sm text-gray-500">No new notifications.</p>
                  ) : (
                    notifications.map((note, index) => (
                      <p key={index} className="text-sm p-2 hover:bg-gray-100">
                        {note}
                      </p>
                    ))
                  )}
                  <button
                    onClick={handleMarkAsRead}
                    className="w-full mt-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Mark as Read
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search donations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white border-gray-300"
            />
          </div>
        </div>

        {/* Pending Donations */}
        {activeSection === "pending" && (
          <>
            <h1 className="text-xl font-semibold mt-6">Pending Donations</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {filteredDonations.map((donation) => (
                <div
                  key={donation.id}
                  className={`p-4 shadow-md rounded-lg bg-white ${
                    donation.expires === "1 hour" ? "border-l-4 border-red-500" : ""
                  }`}
                >
                  <h2 className="text-lg font-semibold">Donor: {donation.donor}</h2>
                  <p className="text-sm text-gray-500">
                    {donation.location} <FaMapMarkerAlt className="inline h-4 w-4" />
                  </p>
                  <p className="text-sm">Quantity: {donation.quantity}</p>
                  <p className={`text-sm ${donation.expires === "1 hour" ? "text-red-500" : "text-gray-500"}`}>
                    Expires in: {donation.expires}
                  </p>
                  {/* Additional Details */}
                  <div className="mt-3 space-y-2">
                    <p className="text-sm"><strong>Food Type:</strong> {donation.foodType}</p>
                    <p className="text-sm"><strong>Instructions:</strong> {donation.instructions}</p>
                  </div>
                  <div className="mt-3 flex gap-3 flex-wrap">
                    <button
                      onClick={() => handleAccept(donation.id)}
                      className="px-4 py-2 rounded-lg font-semibold bg-green-500 text-white cursor-pointer flex items-center gap-1.5"
                    >
                      <FaCheck className="h-4 w-4" /> Accept
                    </button>
                    <button
                      onClick={() => handleReject(donation.id)}
                      className="px-4 py-2 rounded-lg font-semibold bg-red-500 text-white cursor-pointer flex items-center gap-1.5"
                    >
                      <FaTimes className="h-4 w-4" /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Completed Donations */}
        {activeSection === "completed" && (
          <>
            <h1 className="text-xl font-semibold mt-8">Completed Donations</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {history.length === 0 ? (
                <p className="text-gray-600">No completed donations yet.</p>
              ) : (
                history.map((donation, index) => (
                  <div
                    key={index}
                    className="p-4 shadow-md rounded-lg border-l-4 border-green-500 bg-green-100"
                  >
                    <p className="text-lg font-semibold flex items-center gap-2">
                      <FaClipboardCheck className="h-5 w-5 text-green-600" />Donor: {donation.donor}
                    </p>
                    <p className="text-sm">Quantity: {donation.quantity}</p>
                    <p className="text-sm text-gray-600">Completed At: {donation.completedAt}</p>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}


export default NgoDashboard;