import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getOrgList = async () => {
  try {
    const response = await API.get("/organization_list");
    return response.data;
  } catch (error) {
    console.error("Orgnization fetch failed:", error);
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { message: "Something went wrong. Please try again." };
    }
  }
};
