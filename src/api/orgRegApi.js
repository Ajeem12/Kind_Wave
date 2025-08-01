import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const registerOrganization = async (data) => {
  try {
    const response = await API.post("/organization_reg", data);
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
