import { baseUrl } from '.';
import axios from "axios";

export const getAllShops = async () => {
    const res = axios.get(`${baseUrl}/shops`);
    return await res;
}
// api/shops.ts

export const addShopToProduct = async (
  productId: string,
  shopData: {
    vendor_id: string;
    price: number;
    colors: string[];
  }
) => {
  try {
    const response = await axios.post(
      `http://localhost:10000/products/${productId}/add-shop`,
      shopData
    );
    return response.data;
  } catch (error) {
    console.error('Error adding shop:', error);
    throw error;
  }
};
