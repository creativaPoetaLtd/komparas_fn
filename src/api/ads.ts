import { baseUrl } from ".";
import axios from "axios";

export const getAllAds = () => {
    return axios.get(`${baseUrl}/ads`);
}

export const getAllCompaniesAds = () => {
    return axios.get(`${baseUrl}/company-ads`);
}