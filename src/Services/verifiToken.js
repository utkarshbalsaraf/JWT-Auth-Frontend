import axios from "axios";
import toast from "react-hot-toast";

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

export const verifyToken = async ({ token }) => {
  try {
    const response = await axios.post(`${baseUrl}/api/auth/verify-token`, {
      token,
    });
    return response.data.valid;
  } catch (error) {
    const message = error.response?.data?.detail?.message || error.message;
    console.error("Token Verification Error:", message);
    toast.error(`Token Verification Error: ${message}`);
    return error.valid;
  }
};
