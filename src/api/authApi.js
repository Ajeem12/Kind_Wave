import axios from "axios";
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const login = async (data) => {
  try {
    const response = await API.post("/organization_login", data);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);

    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { message: "Something went wrong. Please try again." };
    }
  }
};
