import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  FaMapMarkerAlt,
  FaCheck,
  FaTimes,
  FaBars,
  FaClipboardCheck,
  FaSearch,
} from "react-icons/fa";
import api from "../../api/api";

function NgoDashboard() {
  const [donationList, setDonationList] = useState([]);
  const [history, setHistory] = useState([]);
  const [activeSection, setActiveSection] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchDonations = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await api.get("/donation", config);
      setDonationList(data.filter((d) => d.status === "available"));
      setHistory(data.filter((d) => d.status === "claimed"));
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }, []);

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await api.put(`/donation/${id}/claim`, {}, config);
      const claimed = res.data.donation;

      setDonationList((prev) => prev.filter((d) => d._id !== id));
      setHistory((prev) => [
        ...prev,
        { ...claimed, completedAt: new Date().toLocaleString() },
      ]);
    } catch (error) {
      console.error("Error accepting donation:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to accept donation");
    }
  };

  const handleReject = (id) => {
    setDonationList((prev) => prev.filter((d) => d._id !== id));
  };

  const filteredDonations = useMemo(() => {
    return donationList.filter((donation) =>
      donation.item.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [donationList, searchQuery]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-full md:w-64 p-6 shadow-lg bg-white">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FaBars /> NGO Dashboard
        </h2>
        <ul className="mt-6 space-y-2">
          {[
            { key: "pending", label: "Pending Donations" },
            { key: "completed", label: "Completed Donations" },
          ].map((tab) => (
            <li
              key={tab.key}
              onClick={() => setActiveSection(tab.key)}
              className={`p-3 rounded cursor-pointer transition-all duration-200 ${
                activeSection === tab.key ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </li>
          ))}
        </ul>
        <div className="text-sm text-gray-500 mt-10">© 2025 Food Donation Platform</div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Food Donations</h1>
        </div>

        <div className="mt-6 relative">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search donations..."
            className="w-full pl-10 pr-4 py-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {activeSection === "pending" && (
          <section className="mt-6">
            <h2 className="text-xl mb-4">Pending Donations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonations.length === 0 ? (
                <p className="text-gray-500">No available donations.</p>
              ) : (
                filteredDonations.map((donation) => (
                  <div key={donation._id} className="bg-white p-4 rounded shadow hover:shadow-md transition">
                    <h3 className="font-bold text-lg text-blue-700">{donation.item}</h3>
                    <p className="text-sm text-gray-600">Donor Name: {donation.donor?.name || "N/A"}</p>
                    <p className="text-sm">Quantity: {donation.quantity}{donation.unit}</p>
                    <p className="text-sm">
                      Location: {donation.pickup_address} <FaMapMarkerAlt className="inline" />
                    </p>
                    <p className="text-sm">Expires: {new Date(donation.expiry_time).toLocaleString()}</p>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleAccept(donation._id)}
                        className="bg-green-500 hover:bg-green-600 px-4 py-2 text-white rounded flex items-center gap-1"
                      >
                        <FaCheck /> Accept
                      </button>
                      <button
                        onClick={() => handleReject(donation._id)}
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white rounded flex items-center gap-1"
                      >
                        <FaTimes /> Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {activeSection === "completed" && (
          <section className="mt-6">
            <h2 className="text-xl mb-4">Completed Donations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {history.length === 0 ? (
                <p className="text-gray-500">No completed donations.</p>
              ) : (
                history.map((donation, idx) => (
                  <div
                    key={idx}
                    className="bg-green-100 p-4 rounded shadow border-l-4 border-green-500 hover:shadow-md"
                  >
                    <p className="font-semibold flex items-center gap-2">
                      <FaClipboardCheck /> Donor Name: {donation.donor?.name || "N/A"}
                    </p>
                    <p>Item: {donation.item}</p>
                    <p>Quantity: {donation.quantity}{donation.unit}</p>
                    <p>Claimed At: {new Date(donation.claimedAt).toLocaleString()}</p>
                  </div>
                ))
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default NgoDashboard;