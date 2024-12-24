import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_SERVER;

export const fetchUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`);
    return response.data.data;
  } catch (err) {
    throw err;
  }
};