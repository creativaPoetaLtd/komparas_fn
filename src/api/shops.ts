import { baseUrl } from '.';
import axios from "axios";

export const getAllShops = async () => {
    const res = axios.get(`${baseUrl}/shops`);
    return await res;
}