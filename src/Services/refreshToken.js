import axios from "axios";
import toast from "react-hot-toast";

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

export const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/auth/refresh-token`,
      {},
      { withCredentials: true }
    );
    const tokenExpiryISO = response.data.access_token_expiry;
    // Convert string to Date
    const tokenExpiryDate = new Date(tokenExpiryISO);
    const accessTokenExpiry = tokenExpiryDate.getTime() - 60 * 1000; // subtract 1 min
    localStorage.setItem("accessToken", response.data.access_token);
    localStorage.setItem("accessTokenExpiry", accessTokenExpiry);
    return response.data;
  } catch (error) {
    toast.error(`Failed to refresh token: ${error.message}`);
    throw error;
  }
};
