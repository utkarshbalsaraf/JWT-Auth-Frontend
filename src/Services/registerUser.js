import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

export const registerUser = async ({ payload }) => {
  try {
    const response = await axios.post(`${baseUrl}/api/register`, payload);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
