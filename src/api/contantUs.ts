import { baseUrl } from ".";
import axios from "axios";

export const contactUs = async (data: any) => {
  try {
    const response = await axios.post(`${baseUrl}/contacts`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};