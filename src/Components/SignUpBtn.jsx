import React from "react";
import { useNavigate } from "react-router-dom";

const SignUpBtn = () => {
  const navigate = useNavigate()
  return (
    <>
      <div
       className="w-24 bg-red-600 m-3 p-3  text-center rounded-2xl text-white cursor-pointer"
       onClick={()=> navigate("/signup")}
       >
        <button className="font-medium text-[17px] cursor-pointer">
          SignUp
        </button>
      </div>
    </>
  );
};

export default SignUpBtn;
