// services/api.js
import axios from 'axios';
import { baseUrl } from '.';
export const fetchParentCategories = () => {
  return axios.get(`${baseUrl}/categories/parents`);
};

export const getAllCategories = () => {
  return axios.get(`${baseUrl}/categories/all`);
}

export const deleteCategory = (id: string) => {
  return axios.delete(`${baseUrl}/categories/${id}`);
}

export const addCategory = (categoryData: any) => {
  return axios.post(`${baseUrl}/category/add`, categoryData);
}

