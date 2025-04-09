import React from "react";
import { useNavigate } from "react-router-dom";

const LogInBtn = () => {
  
  
  const navigate = useNavigate();


  return (
    <div
      className="w-24 bg-blue-600 m-3 p-3 text-center rounded-2xl text-white cursor-pointer"
      onClick={() => navigate("/login")}
    >
      <button className="font-medium text-[17px] cursor-pointer">LogIn</button>
    </div>
  );
};

export default LogInBtn;
