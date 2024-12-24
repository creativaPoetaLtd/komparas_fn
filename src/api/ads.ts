import { baseUrl } from ".";
import axios from "axios";

export const getAllAds = () => {
    return axios.get(`${baseUrl}/ads`);
}

export const getAllCompaniesAds = () => {
    return axios.get(`${baseUrl}/company-ads`);
}

export const getAllCompaniesAdsAdmin = () => {
    return axios.get(`${baseUrl}/company-ads/admin`);
}

export const toggleAdActiveStatus = (id: string) => {
    return axios.put(`${baseUrl}/company-ads/${id}/toggle-active`);
}

export const toggleAdvertActiveStatus = (id: string) => {
    return axios.put(`${baseUrl}/ads/${id}/toggle-active`);
}