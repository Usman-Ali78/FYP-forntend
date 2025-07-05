import React, { useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New pickup request from NGO XYZ", time: "2 hours ago" },
    { id: 2, message: "Donation claimed by NGO ABC", time: "4 hours ago" },
  ]);

  return (
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
  );
};

export default Notifications;