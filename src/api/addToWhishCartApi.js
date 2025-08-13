import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const addToWhishCart = async ({ whish_cart_id, type }, token) => {
  try {
    const response = await API.post(
      `/whish_cart_add`,
      { whish_cart_id, type },
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

export const getWhishCart = async (token) => {
  try {
    const response = await API.get(`/whish_cart_list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("Response:", response);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch whishlist:", error);
    throw (
      error.response?.data || {
        message: error.message || "Something went wrong. Please try again.",
      }
    );
  }
};
