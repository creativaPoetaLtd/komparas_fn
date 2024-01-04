import axios from 'axios';
import { baseUrl } from '.';

export const getAllShops = () => {
  return axios.get(`${baseUrl}/shops`);
}

export const getShopById = (id: string) => {
  return axios.get(`${baseUrl}/shops/${id}`);
}

export const getShopByVendorId = (id: string) => {
  return axios.get(`${baseUrl}/shops/vendor/${id}`);
}

export const getShopByCategory = (category: string) => {
  return axios.get(`${baseUrl}/shops/category/${category}`);
}

export const getShopBySearch = (search: string) => {
  return axios.get(`${baseUrl}/shops/search/${search}`);
}

export const addShop = (shopData: any) => {
  const formData = new FormData();
  formData.append('shop_name', shopData.shop_name);
  formData.append('shop_description', shopData.shop_description);
  formData.append('shop_address', shopData.shop_address);
  formData.append('shop_category', shopData.shop_category);
  formData.append('shop_image', shopData.shop_image);

  return axios.post(`${baseUrl}/shops/add`, formData);
}

export const deleteShop = (id: string) => {
  return axios.delete(`${baseUrl}/shops/${id}`);
}