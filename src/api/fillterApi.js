import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// export const fillter = async ({ query, filters, token }) => {
//   try {
//     const response = await API.get(`/filter_serach_event`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       params: {
//         query,
//         filters,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Filter search failed:", error);
//     throw error.response?.data || { message: "Something went wrong" };
//   }
// };

export const fillter = async ({ filters, token }) => {
  try {
    const params = new URLSearchParams({
      // query,
      organization: filters.orgs,
      orgtype: filters.orgTypes,
      field: filters.fields,
      communities: filters.communities,
      support: filters.supports,
      region: filters.region,
    });

    const response = await API.get(
      `/filter_search_event?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Filter search failed:", error);
    throw error.response?.data || { message: "Something went wrong" };
  }
};
