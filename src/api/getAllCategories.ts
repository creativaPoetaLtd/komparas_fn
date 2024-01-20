// services/api.js
import axios from 'axios';
import { baseUrl } from '.';
export const fetchParentCategories = () => {
  return axios.get(`${baseUrl}/categories/parents`);
};

export const getAllCategories = () => {
  return axios.get(`${baseUrl}/categories/all`);
}

export const getCategoryById = (id: string) => {
  return axios.get(`${baseUrl}/categories/${id}`);
}
export const deleteCategory = (id: string) => {
  return axios.delete(`${baseUrl}/categories/${id}`);
}

export const addCategory = (categoryData: any) => {
  return axios.post(`${baseUrl}/category/add`, categoryData);
}

export const updateCategory = (categoryData: any, id: string) => {
  return axios.put(`${baseUrl}/categories/${id}`, categoryData);
}


