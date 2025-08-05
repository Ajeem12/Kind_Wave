import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const applyOnEvent = async (eventId, token) => {
  try {
    const responce = await API.post(
      `/apply_for_event`,
      { event_id: eventId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response:", responce);
    return responce.data;
  } catch (error) {
    console.error("Application failed:", error);
    throw (
      error.response?.data || {
        message: error.message || "Something went wrong. Please try again.",
      }
    );
  }
};
