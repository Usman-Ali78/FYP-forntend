import React, { useState } from "react";
import { FaEdit, FaTrash, FaSearch, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useDonations from "../../hooks/useDonations";

const allowedDonationItems = [
  "Buffet leftovers",
  "Unserved banquet/event meals",
  "Breakfast items (pastries, pancakes, scrambled eggs)",
  "Soups & stews (kept at safe temps)",
  "Pasta dishes (lasagna, spaghetti)",
  "Rice-based dishes (biriyani, fried rice)",
  "Pizza (whole, unsliced preferred)",
  "Sandwiches/wraps (unwrapped, fresh)",
  "Fresh bread rolls/baguettes",
  "Croissants, muffins, danishes",
  "Cakes (whole or sliced, no cream if perishable)",
  "Cookies & biscuits",
  "Donuts (day-old acceptable)",
  "Salad bar leftovers (undressed)",
  "Sliced fruits (melons, pineapples, berries)",
  "Vegetable platters (carrots, celery, cucumbers)",
  "Whole fruits (bananas, apples, oranges)",
  "Cheese platters",
  "Yogurt parfaits",
  "Hard-boiled eggs",
  "Milk cartons (unopened)",
  "Condiment packets (ketchup, mustard, mayo)",
  "Cereal boxes (individual servings)",
  "Jam/honey packets",
  "Bottled beverages (unopened)",
  "Coffee/tea pods",
  "Packed lunches (sandwiches, fruit cups)",
  "Granola bars/protein bars",
  "Chips/snack packs",
];

const Donations = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const {
    donations,
    loading,
    error,
    authError,
    formData,
    editingId,
    donationToDelete,
    setDonationToDelete,
    handleSubmit,
    handleChange,
    editDonation,
    deleteDonation,
    resetForm,
  } = useDonations();

  const filteredDonations = donations.filter((donation) =>
    donation.item?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatExpiryTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((date - now) / (1000 * 60 * 60));
    if (diffHours <= 0) return "Expired";
    if (diffHours < 24)
      return `Expires in ${diffHours} hour${diffHours !== 1 ? "s" : ""}`;
    const diffDays = Math.floor(diffHours / 24);
    return `Expires in ${diffDays} day${diffDays !== 1 ? "s" : ""}`;
  };

  if (authError) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-bold text-red-600 mb-4">
          Authentication Required
        </h2>
        <p className="mb-4">Please login to access this feature.</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (loading)
    return <div className="text-center py-8">Loading donations...</div>;

  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Manage Food Donations</h2>

      {/* Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center bg-white p-2 rounded-lg shadow-sm w-full md:w-1/2">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search donations..."
            className="outline-none w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all w-full md:w-auto justify-center"
          onClick={() => {
            resetForm();
            setIsFormModalOpen(true);
          }}
        >
          <FaPlus className="mr-2" />
          Add Donation
        </button>
      </div>

      {/* Donation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDonations.length > 0 ? (
          filteredDonations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">{donation.item}</h3>
                <span className="text-sm px-2 py-1 rounded-full bg-green-300 text-green-800">
                  {donation.status}
                </span>
              </div>
              <p className="text-gray-600 mb-2">
                Quantity: {donation.quantity}
              </p>
              <p className="text-gray-500 text-sm mb-2">
                📍 {donation.pickup_address}
              </p>
              <p className="text-gray-500 text-sm">
                ⏳ {formatExpiryTime(donation.expiry_time)}
              </p>
              {donation.ngo_id && (
                <p className="text-gray-500 text-sm mt-2">
                  Claimed by: {donation.ngo_id.name || "NGO"}
                </p>
              )}
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  className="text-blue-500 hover:text-blue-700 transition-all"
                  onClick={() => {
                    editDonation(donation);
                    setIsFormModalOpen(true);
                  }}
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
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No donations found matching your criteria
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 lg:w-1/3 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Donation" : "Add New Donation"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
                setIsFormModalOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block mb-1 text-gray-700">Food Item</label>
                <select
                  name="item"
                  value={formData.item}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="" disabled>
                    Select a food item...
                  </option>
                  {allowedDonationItems.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 text-gray-700">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700">Expiry Time</label>
                <input
                  type="datetime-local"
                  name="expiry_time"
                  value={formData.expiry_time}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700">
                  Pickup Address
                </label>
                <input
                  type="text"
                  name="pickup_address"
                  value={formData.pickup_address}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => setIsFormModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  {editingId ? "Update Donation" : "Add Donation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {donationToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">Confirm Deletion</h3>
            <p className="mb-4">
              Are you sure you want to delete "{donationToDelete.item}"?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setDonationToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={deleteDonation}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donations;
