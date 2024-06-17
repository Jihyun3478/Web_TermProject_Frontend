import axios from "axios";

const API_BASE_URL = "http://localhost:8080";
export const fetchAllClubs = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/club/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching all clubs:", error);
    throw error;
  }
};
