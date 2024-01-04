import axios from 'axios';
import { baseUrl } from '.';

export const getAllShops = () => {
  return axios.get(`${baseUrl}/shops`);
}