import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

function Login({ setIsRegister }) {
  const navigate = useNavigate();
  const [loginLoading, setLoginLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginCall = async () => {
    setLoginLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/api/auth/login`, formData, {
        withCredentials: true,
      });
      navigate("/");
      const tokenExpiryISO = response.data.access_token_expiry;
      const tokenExpiryDate = new Date(tokenExpiryISO);
      const accessTokenExpiry = tokenExpiryDate.getTime() - 60 * 1000;
      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("accessTokenExpiry", accessTokenExpiry);
      return response;
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginPromise = loginCall();

    toast.promise(loginPromise, {
      loading: "Logging in...",
      success: "Login Successful ✅",
      error: (err) => {
        if (err.response?.status === 432) return "Username does not exist";
        if (err.response?.status === 433) return "Incorrect Password";
        return "Something went wrong";
      },
    });
  };

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0, scale: 1.2 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8"
    >
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        Welcome Back 👋
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Email or Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loginLoading}
          className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        >
          Log In
        </button>
      </form>

      {/* Extra Links */}
      <div className="mt-6 flex justify-between text-sm text-gray-400">
        <button
          onClick={() => toast.success("Hello World")}
          className="hover:text-indigo-400"
        >
          Forgot password?
        </button>
        <button
          className="hover:text-indigo-400"
          onClick={() => setIsRegister(true)}
        >
          Create account
        </button>
      </div>
    </motion.div>
  );
}

export default Login;
