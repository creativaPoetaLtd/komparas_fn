/* eslint-disable @typescript-eslint/no-explicit-any */
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
      `${baseUrl}/products/${productId}/add-shop`,
      shopData
    );
    return response.data;
  } catch (error) {
    console.error('Error adding shop:', error);
    throw error;
  }
};

export const removeShopFromProduct = async (
  productId: string,
  shopId: string
) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/products/${productId}/vendors/${shopId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error removing shop:', error);
    throw error;
  }
};


export const addKomparasCode = async (
  fromData:any
) => {
  try {
    const response = await axios.post(
      `${baseUrl}/komparas-codes/add`,
      fromData
    );
    return response.data;
  } catch (error) {
    console.error('Error adding shop:', error);
    throw error;
  }
}

export const getKomparasCodebyCode = async (
  code: string
) => {
  try {
    const response = await axios.get(
      `${baseUrl}/komparas-codes/${code}`
    );

    return response.data;
  } catch (error:any) {
    return error.response.data;
    
  }

}

export const updateIsSoldConfirmToTrue = async (
  code: string
) => {
  try {
    const response = await axios.put(
      `${baseUrl}/komparas-codes/${code}`
    );
    return response.data;
  } catch (error) {
    console.error('Error adding shop:', error);
    throw error;
  }
}

export const updateIsShopSoldConfirmToTrue = async (
  code:string
)=>{
  try {
    const response = await axios.put(
      `${baseUrl}/komparas-codes/shop-sold-confirm/${code}`
    );
    return response.data;
  } catch (error) {
    console.error('Error adding shop:', error);
    throw error;
  }
}

export const getLatestComparasCodeByEmailOrPhone = async (
  emailOrPhone: string
) => {
  try {
    const response = await axios.get(
      `${baseUrl}/komparas-codes/latestemailOrPhone/${emailOrPhone}`
    );
    return response.data;
  } catch (error) {
    console.error('Error adding shop:', error);
    throw error;
  }
}

export const getAllKomparasCodes = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/komparas-codes`
    );
    return response.data;
  } catch (error) {
    console.error('Error adding shop:', error);
    throw error;
  }
}