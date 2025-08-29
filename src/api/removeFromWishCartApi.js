import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const removeFromWhishCart = async ({ orgId }, token) => {
  try {
    const response = await API.post(
      `/whish_cart_remove`,
      { id: orgId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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

export const removeFromEventWhishCart = async ({ evtId }, token) => {
  try {
    const response = await API.post(
      `/whish_cart_remove`,
      { id: evtId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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
