import { useState } from "react";
import { motion } from "framer-motion";
import { registerUser } from "./Services/registerUser";
import toast from "react-hot-toast";
import { th } from "framer-motion/client";

function Registration({ setIsRegister }) {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const callRegisterUser = async () => {
    const payload = {
      fullname: formData.fullName,
      username: formData.username,
      password: formData.password,
    };

    setLoading(true);
    try {
      const response = await registerUser({ payload });
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const registerPromise = callRegisterUser();
    toast.promise(registerPromise, {
      loading: "Registering...",
      success: "Registration Successful ✅",
      error: (err) => {
        if (err.response?.status === 431) return "Username already exists";
        return "Something went wrong";
      },
    });
  };

  return (
    <motion.div
      key="register"
      initial={{ opacity: 0, scale: 1.2 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-full  max-w-md bg-gray-800 rounded-2xl shadow-lg p-8"
    >
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        Create Account ✨
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

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
          disabled={loading}
          className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>

      {/* Extra Links */}
      <div className="mt-6 text-center text-sm text-gray-400">
        Already have an account?
        <button
          onClick={() => setIsRegister(false)}
          className="text-indigo-400 hover:text-indigo-300 ms-1"
        >
          Log in
        </button>
      </div>
    </motion.div>
  );
}

export default Registration;
