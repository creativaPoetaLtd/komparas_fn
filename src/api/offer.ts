import { baseUrl } from '.';
import axios from "axios";

export const addDayProduct = async (data: any) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('offer', data.offer);
    formData.append('price', data.price);
    formData.append('image', data.image);
    const res =await fetch(`${baseUrl}/dayphone`, {
        method: 'POST',
        body: formData,
    });
    return await res.json();
}

export const updateDayProduct = async (data: any) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('offer', data.offer);
    formData.append('price', data.price);
    formData.append('image', data.image);
    const res =await fetch("http://localhost:3000/dayphone", {
        method: 'PUT',
        body: formData,
    });
    return await res.json();
}

export const getDayProduct = async () => {
    const res = axios.get(`${baseUrl}/dayphone`);
    return await res;
}

export const deleteDayProduct = async (id: string) => {
    const res = axios.delete(`${baseUrl}/dayphone/${id}`);
    return await res;
}

