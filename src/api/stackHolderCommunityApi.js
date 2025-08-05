import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getStackHolderCom = async () => {
  try {
    const response = await API.get("/stack_holder_communitiy");
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
