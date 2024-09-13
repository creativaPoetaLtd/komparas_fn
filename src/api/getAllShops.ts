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
  return axios.post(`${baseUrl}/shops/add`, shopData);
}

export const updateShop = (shopData: any, id:string) => {
  return axios.put(`${baseUrl}/shops/${id}`, shopData);
}

export const deleteShop = (id: string) => {
  return axios.delete(`${baseUrl}/shops/${id}`);
}

// updateShop acceptance status

export const updateShopAcceptance = (id: string) => {
  return axios.put(`${baseUrl}/shops/toggle-acceptance/${id}`);
}

