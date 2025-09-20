import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";
import { AnimatePresence } from "framer-motion";

const Authentication = () => {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-900">
      <AnimatePresence mode="wait">
        {isRegister ? (
          <Registration setIsRegister={setIsRegister} />
        ) : (
          <Login setIsRegister={setIsRegister} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Authentication;
