import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login({ setIsRegister }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
    localStorage.setItem("token", "dummy-jwt-token");
    navigate("/");

    // TODO: Add your auth logic
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
        {/* Email / Username */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Email or Username
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
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
