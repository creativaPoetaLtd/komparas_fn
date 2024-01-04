import { baseUrl } from '.';
import axios from "axios";

export const getAllProducts = async () => {
    const res = axios.get(`${baseUrl}/products`);
    return await res;
}

export const getPoductByCategory = async (category: string) => {
    const res = axios.get(`${baseUrl}/products/category/${category}`);
    return await res;
}

export const getPoductById = async (id: string) => {
    const res = axios.get(`${baseUrl}/products/images/${id}`);
    return await res;
}

export const getProductOnCategory = async (category: string) => {
    const res = axios.get(`${baseUrl}/products/category/${category}`);
    return await res;
}

export const getProductOnSearch = async (search: string) => {
    const res = axios.get(`${baseUrl}/products/search/${search}`);
    return await res;
}

export const addProduct = async (productData: any) => {
    const formData = new FormData();
    formData.append('product_name', productData.product_name);
    formData.append('product_description', productData.product_description);
    formData.append('product_price', productData.product_price);
    formData.append('category_name', productData.category); // Assuming you have a category field in productData
    formData.append('vendor_ids', productData.shop); // Assuming you have a shop field in productData
    formData.append('product_image', productData.product_image);

    // Convert specifications array to JSON string and append it
  // Append each specification separately
  productData.specifications.forEach((specification: { key: string | Blob; value: string | Blob; }, index: any) => {
    formData.append(`specifications[${index}][key]`, specification.key ? specification.key : '-');
    formData.append(`specifications[${index}][value]`, specification.value ? specification.value: '-');
});
    const res = await fetch(`${baseUrl}/products/add`, {
        method: 'POST',
        body: formData,
    });

    return await res.json();
};

export const deleteProduct = async (id: string) => {
    const res = await fetch(`${baseUrl}/products/${id}`, {
        method: 'DELETE',
    });

    return await res.json();
};
