import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const authcheck = () => {
    if (!token) {
      navigate("/auth");
    }
  };
  useEffect(() => {
    authcheck();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/auth");
  };

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
