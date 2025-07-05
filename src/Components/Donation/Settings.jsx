import React, { useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    restaurantName: "My Restaurant",
    contact: "123-456-7890",
    address: "123 Main St, City",
    notifications: true,
    theme: "light",
  });

  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
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
  );
};

export default Settings;