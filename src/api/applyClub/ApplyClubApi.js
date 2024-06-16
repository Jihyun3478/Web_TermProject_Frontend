import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const createApplyClub = async (requestDTO, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/applyClub/create`,
      requestDTO,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating apply club:", error);
    throw error;
  }
};
