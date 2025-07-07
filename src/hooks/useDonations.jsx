import { useState, useEffect } from "react";
import api from "../../api/api"

const initialFormState = {
  item: "",
  quantity: "",
  unit:"",
  expiry_time: "",
  pickup_address: "",
  status: "available",
};

const useDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authError, setAuthError] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);
  const [donationToDelete, setDonationToDelete] = useState(null);

  const getAuthToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthError(true);
      return null;
    }
    return token;
  };

  const handleAuthError = () => {
    setAuthError(true);
    localStorage.removeItem("token");
    setError("Session expired. Please login again.");
  };

  const fetchDonations = async () => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const response = await api.get("/donation", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDonations(response.data || []);
    } catch (err) {
      if (err.response?.status === 401) {
        handleAuthError();
      } else {
        setError(err.response?.data?.message || "Failed to fetch donations");
      }
    } finally {
      setLoading(false);
    }
  };

const handleSubmit = async () => {
  try {
    const token = getAuthToken();
    if (!token) return;

    const config = { headers: { Authorization: `Bearer ${token}` } };

    const payload = {
      ...formData,
      status: "available", // always set to available for new donations
    };

    if (editingId) {
      const res = await api.put(`/donation/${editingId}/edit`, payload, config);
      setDonations((prev) =>
        prev.map((d) => (d._id === editingId ? res.data : d))
      );
    } else {
      const res = await api.post("/donation", payload, config);
      setDonations((prev) => [res.data, ...prev]);
    }
    
    resetForm();
  } catch (err) {
    if (err.response?.status === 401) handleAuthError();
    else alert(err.response?.data?.message || "Operation failed");
  }
};

  const deleteDonation = async () => {
    try {
      const token = getAuthToken();
      if (!token) return;

      await api.delete(`/donation/${donationToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDonations((prev) =>
        prev.filter((d) => d._id !== donationToDelete._id)
      );
      setDonationToDelete(null);
    } catch (err) {
      if (err.response?.status === 401) handleAuthError();
      else alert(err.response?.data?.message || "Delete failed");
    }
  };

  const editDonation = (donation) => {
    setFormData({
      item: donation.item,
      quantity: donation.quantity,
      unit:donation.unit,
      expiry_time: new Date(donation.expiry_time).toISOString().slice(0, 16),
      pickup_address: donation.pickup_address,
      status: donation.status,
    });
    setEditingId(donation._id);
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) || 0 : value,
    }));
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return {
    donations,
    loading,
    error,
    authError,
    formData,
    setFormData,
    editingId,
    donationToDelete,
    setDonationToDelete,
    handleSubmit,
    handleChange,
    editDonation,
    deleteDonation,
    resetForm,
    setEditingId,
  };
};

export default useDonations;
