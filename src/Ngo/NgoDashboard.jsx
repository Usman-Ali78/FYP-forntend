import React, { useState, useMemo } from "react";
import {
  FaMapMarkerAlt,
  FaHandHoldingHeart,
  FaClipboardCheck,
  FaSearch,
  FaBars,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";
import useDonations from "../hooks/useDonations";
import ClaimDetailsModal from "../Components/Donation/Claim/ClaimDetailsModal";
import LoadingSpinner from "../Components/LoadingSpinner";

function NgoDashboard() {
  // State for UI controls
  const [activeSection, setActiveSection] = useState("available");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClaim, setSelectedClaim] = useState(null);

  // Get donation data from custom hook
  const {
    donations,
    loading,
    claims,
    loadingClaims,
    requestedDonations,
    createClaimRequest,
    markDelivered,
  } = useDonations();

  // Memoized filtered data
  const availableDonations = useMemo(
    () => donations.filter(d => d.status === "available"),
    [donations]
  );
  const completedDonations = useMemo(
    () => donations.filter(d => d.status === "delivered"),
    [donations]
  );
  const myActiveClaims = useMemo(
    () => claims.filter(claim => 
      claim.status !== "delivered" && 
      claim.status !== "completed" && 
      claim.status !== "rejected"
    ),
    [claims]
  );
  const rejectedClaims = useMemo(
    () => claims.filter(claim => claim.status === "rejected"),
    [claims]
  );

  // Filter donations and claims based on search query
  const filteredDonations = useMemo(
    () => availableDonations.filter(d => 
      d.item.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [availableDonations, searchQuery]
  );
  const filteredClaims = useMemo(
    () => claims.filter(c => 
      c.donation?.item?.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [claims, searchQuery]
  );

  // Handle claim submission directly
  const handleClaimSubmit = async (donationId) => {
    try {
      await createClaimRequest(donationId, "Requesting this donation for our NGO");
      // The hook will automatically update the requestedDonations list
    } catch (error) {
      console.error("Error submitting claim:", error);
    }
  };

  // Check if a donation has been requested
  const isDonationRequested = (donationId) => {
    return requestedDonations.includes(donationId) || 
           claims.some(claim => claim.donation?._id === donationId);
  };

  // Navigation tabs configuration
  const navTabs = [
    { key: "available", label: "Available Donations", icon: <FaSearch /> },
    { key: "my-claims", label: "My Claims", icon: <FaHandHoldingHeart /> },
    { key: "completed", label: "Completed Donations", icon: <FaClipboardCheck /> },
    { key: "rejected", label: "Rejected Donations", icon: <FaTimesCircle /> },
  ];

  // Section titles mapping
  const sectionTitles = {
    "available": "Available Donations",
    "my-claims": "My Claim Requests",
    "completed": "Completed Donations",
    "rejected": "Rejected Donations",
  };
  
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 text-gray-900">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 p-6 shadow-lg bg-white">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FaBars /> NGO Dashboard
        </h2>
        <ul className="mt-6 space-y-2">
          {navTabs.map(tab => (
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

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        {/* Header and Search */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">{sectionTitles[activeSection]}</h1>
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

        {/* Loading State */}
        {loading || loadingClaims ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Available Donations Section */}
            {activeSection === "available" && (
              <section className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDonations.length === 0 ? (
                    <p className="text-gray-500">No available donations.</p>
                  ) : (
                    filteredDonations.map(donation => (
                      <div key={donation._id} className="bg-white p-4 rounded shadow hover:shadow-md transition">
                        <h3 className="font-bold text-lg text-blue-700">{donation.item}</h3>
                        <p className="text-sm text-gray-600">Donor: {donation.donor?.restaurant_name || "N/A"}</p>
                        <p className="text-sm">Quantity: {donation.quantity}{donation.unit}</p>
                        <p className="text-sm flex items-center gap-1"><FaMapMarkerAlt /> {donation.pickup_address}</p>
                        <p className="text-sm flex items-center gap-1"><FaClock /> {new Date(donation.expiry_time).toLocaleString()}</p>
                        
                        <button
                          onClick={() => handleClaimSubmit(donation._id)}
                          className={`mt-3 w-full text-white py-2 rounded flex items-center justify-center gap-2 cursor-pointer ${
                            isDonationRequested(donation._id) ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
                          }`}
                          disabled={isDonationRequested(donation._id)}
                        >
                          <FaHandHoldingHeart />
                          {isDonationRequested(donation._id) ? "Requested" : "Request Donation"}
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </section>
            )}

            {/* Other sections remain unchanged */}
            {activeSection === "my-claims" && (
              <section className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myActiveClaims.length === 0 ? (
                    <p className="text-gray-500">No active claim requests.</p>
                  ) : (
                    myActiveClaims.map(claim => (
                      <div
                        key={claim._id}
                        className={`bg-white p-4 rounded shadow hover:shadow-md transition border-l-4 ${
                          claim.status === "approved" ? "border-green-500" :
                          claim.status === "rejected" ? "border-red-500" : "border-blue-500"
                        }`}
                        onClick={() => setSelectedClaim(claim)}
                        style={{ cursor: "pointer" }}
                      >
                        <h3 className="font-bold text-lg">{claim.donation?.item || "Unknown Item"}</h3>
                        <p className="text-sm">Status: {claim.status}</p>
                        <p className="text-sm">Quantity: {claim.donation?.quantity}{claim.donation?.unit}</p>
                        <p className="text-sm">Requested: {new Date(claim.requestedAt).toLocaleString()}</p>
                      </div>
                    ))
                  )}
                </div>
              </section>
            )}

            {activeSection === "completed" && (
              <section className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedDonations.length === 0 ? (
                    <p className="text-gray-500">No completed donations.</p>
                  ) : (
                    completedDonations.map(donation => (
                      <div key={donation._id} className="bg-green-100 p-4 rounded shadow border-l-4 border-green-500">
                        <h3 className="font-bold text-lg">{donation.item}</h3>
                        <p className="text-sm">Donor: {donation.donor?.restaurant_name || "N/A"}</p>
                        <p className="text-sm">Quantity: {donation.quantity}{donation.unit}</p>
                        <p className="text-sm">Delivered: {new Date(donation.updatedAt).toLocaleString()}</p>
                      </div>
                    ))
                  )}
                </div>
              </section>
            )}

            {activeSection === "rejected" && (
              <section className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rejectedClaims.length === 0 ? (
                    <p className="text-gray-500">No rejected donations found.</p>
                  ) : (
                    rejectedClaims.map(claim => (
                      
                      <div key={claim._id} className="bg-red-100 p-4 rounded shadow border-l-4 border-red-500">
                        <h3 className="font-bold text-lg">{claim.donation?.item}</h3>
                        <p className="text-sm">Donor: {claim.donation?.donor?.restaurant_name|| claim.donor?.restaurant_name || claim.restaurant_name || "N/A"}</p>
                        <p className="text-sm">Quantity: {claim.donation?.quantity}{claim.donation?.unit}</p>
                        <p className="text-sm">Rejected On: {new Date(claim.updatedAt).toLocaleString()}</p>
                        <p className="text-sm italic text-gray-600">Status: {claim.status}</p>
                      </div>
                    ))
                  )}
                </div>
              </section>
            )}
          </>
        )}

        <ClaimDetailsModal
          claim={selectedClaim}
          onClose={() => setSelectedClaim(null)}
          onMarkDelivered={async () => {
            await markDelivered(selectedClaim.donation._id);
          }}
        />
      </main>
    </div>
  );
}

export default NgoDashboard;