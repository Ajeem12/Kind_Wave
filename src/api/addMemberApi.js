import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const addMember = async (memberData, token) => {
  try {
    const response = await API.post("/add_orgnization_journey", memberData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);

    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { message: "Something went wrong. Please try again." };
    }
  }
};

export const editMember = async (id, formData, token) => {
  try {
    const response = await API.post(
      `/update_orgnization_journey/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

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
