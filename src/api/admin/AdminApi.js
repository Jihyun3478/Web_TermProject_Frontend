import axios from "axios";

const API_BASE_URL = "http://localhost:8080/admin";

export const fetchApplyClubList = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching apply club list:", error);
    throw error;
  }
};

export const fetchApplyClubDetail = async (applyClubId, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/list/${applyClubId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(
      `Error fetching apply club detail for ID ${applyClubId}:`,
      error
    );
    throw error;
  }
};

export const acceptApplyClub = async (applyClubId, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/accept/${applyClubId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error accepting apply club:", error);
    throw error;
  }
};

export const refuseApplyClub = async (applyClubId, refuseReason, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/refuse/${applyClubId}`,
      { refuseReason },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error refusing apply club:", error);
    throw error;
  }
};
