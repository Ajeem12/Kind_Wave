import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getAppliedVolunteer = async (token) => {
  try {
    const response = await API.get("/applied_volunteer_list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response:", response);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch applied volunteers:", error);
    throw (
      error.response?.data || {
        message: error.message || "Something went wrong. Please try again.",
      }
    );
  }
};
