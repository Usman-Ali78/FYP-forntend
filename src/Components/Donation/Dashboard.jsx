import React from "react";

const Dashboard = () => {
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

  return (
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
  );
};

export default Dashboard;