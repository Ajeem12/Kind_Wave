import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const editEvent = async (id, formData, token) => {
  try {
    const response = await API.post(`/event_update/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Response:", response);
    return response.data;
  } catch (error) {
    console.error("Full error:", error);
    console.error("Error response:", error.response);
    throw (
      error.response?.data || {
        message: error.message || "Something went wrong. Please try again.",
      }
    );
  }
};
