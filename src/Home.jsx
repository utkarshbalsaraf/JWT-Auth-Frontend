import { s } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "./Services/verifiToken";
import toast from "react-hot-toast";
import { refreshToken } from "./Services/refreshToken";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessTokenExpiry");
    navigate("/auth");
  };

  const tokenVerification = async () => {
    const response = await verifyToken({ token: localStorage.getItem("accessToken") });
    if (!response) {
      handleLogout();
    }
  };

  const callRefreshToken = async () => {
    try {
      const response = await refreshToken();
    } catch (error) {
      handleLogout();
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      tokenVerification();
      const expiry = new Date(Number(localStorage.getItem("accessTokenExpiry")));
      console.log("tokenExpiry", localStorage.getItem("accessTokenExpiry"), "Expiry Date:", expiry, "Current Date:", new Date());
      if (Date.now() >= expiry) {
        callRefreshToken();
      }
    }, 20000);

    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div className="w-full h-full bg-gray-800">
      <button
        className="p-2 bg-red-600 text-white rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
