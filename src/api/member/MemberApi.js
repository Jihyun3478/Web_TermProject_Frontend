import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getApplyClubList = async () => {
  const token = localStorage.getItem("token");
  return api.get("/member/applyClub/list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default api;
