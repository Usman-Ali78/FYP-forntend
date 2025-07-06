// components/LogoutButton.jsx
import React from "react";
import { useAuth } from "../Context/authContext";


const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button 
      onClick={logout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;