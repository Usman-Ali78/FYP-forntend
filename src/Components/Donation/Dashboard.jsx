import React, { useState, useEffect } from "react";
import api from "../../../api/api";

const Dashboard = () => {
  const [totalDonations, setTotalDonations] = useState({
    total: 0,
    available: 0,
    claimed: 0,
    pending_pickup: 0,
    delivered: 0,
  });
  useEffect(() => {
    const fetchTotalDonations = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await api.get("/donation/my-total", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data);
        
        setTotalDonations(data);
      } catch (error) {
        console.error("Error fetching total donations:", error);
      }
    };

    fetchTotalDonations();
  }, []);


  const recentActivity = [
    {
      id: 1,
      type: "Donation",
      description: "5 kg of rice donated",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "Pickup",
      description: "Scheduled pickup for 10 kg of vegetables",
      time: "1 day ago",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 shadow rounded-xl">
          📦 Total Donations: {totalDonations.total}
        </div>
        <div className="bg-white p-5 shadow rounded-xl">
          🚚 Pending Pickups: {totalDonations.pending_pickup}
        </div>
        <div className="bg-white p-5 shadow rounded-xl">
          🌍 Available Donations: {totalDonations.available}
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
  );
};

export default Dashboard;
