import { baseUrl } from '.';
import axios from "axios";

export const getAllProducts = async (minPrice?: number, maxPrice?: number, categoryId?: string, vendorId?: any[], ram?: any, storage?:any, camera?:any, types?:any) => {
  let res:any
  let url = `${baseUrl}/products?`
  if(minPrice && maxPrice){
    url += `minPrice=${minPrice}&maxPrice=${maxPrice}`;
  }
  if (categoryId) {
    url += `&category=${categoryId}`;
  }
  if (vendorId) {
    url += `&vendor_id=${vendorId}`;
  }
  if (ram) {
    url += `&ram=${ram}`;
  }
  if (storage) {
    url += `&storage=${storage}`;
  }
  if (camera) {
    url += `&camera=${camera}`;
  }
  if (types) {
    url += `&types=${types}`;
  }
  
   res = axios.get(url);
  return await res;
}

export const getPoductByCategory = async (category: string) => {
  const res = axios.get(`${baseUrl}/products/category/${category}`);
  return await res;
}

export const getProductByMultpleIdsInQueryParams = async (ids: string[]) => {
  const res = axios.get(`${baseUrl}/products/prod?productIds=${ids}`);
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

export const getProductOnShop = async (shop: string) => {
  const res = axios.get(`${baseUrl}/products/vendor/${shop}`);
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
  formData.append('category_name', productData.category);
  formData.append('our_price', productData.our_price)
  formData.append('product_image', productData.product_image);

  productData.specifications.forEach((specification: { key: string | Blob; value: string | Blob; }, index: any) => {
    formData.append(`specifications[${index}][key]`, specification.key ? specification.key : '-');
    formData.append(`specifications[${index}][value]`, specification.value ? specification.value : '-');
  });

  productData.our_review.forEach((our_review: { key: string | Blob; value: string | Blob; }, index: any) => {
    formData.append(`our_review[${index}][key]`, our_review.key ? our_review.key : '-');
    formData.append(`our_review[${index}][value]`, our_review.value ? our_review.value : '-');
  });
  productData.vendor_prices.forEach((vendor_prices: { key: string | Blob; value: string | Blob,  colors: string | Blob }, index: any) => {
    formData.append(`vendor_prices[${index}][vendor_id]`, vendor_prices.key ? vendor_prices.key : '-');
    formData.append(`vendor_prices[${index}][price]`, vendor_prices.value ? vendor_prices.value : '-');
    formData.append(`vendor_prices[${index}][colors]`, vendor_prices.colors ? vendor_prices.colors : '-');
  });

  const res = await fetch(`${baseUrl}/products/add`, {
    method: 'POST',
    body: formData,
  });

  return await res.json();
};


export const addPRoductimage = async (productData: any , id:any) => {
  const formData = new FormData();
  formData.append('product_image', productData.product_image);
  const res = await fetch(`${baseUrl}/product_images/${id}`, {
    method: 'POST',
    body: formData,
  });
  return await res.json();
}

export const updateProduct = async (productData: any, id: string) => {
  const formData = new FormData();
  formData.append('product_name', productData.product_name);
  formData.append('product_description', productData.product_description);
  formData.append('category_name', productData.category);
  formData.append('product_image', productData.product_image);
  formData.append('our_review', productData.our_review)
  productData.specifications.forEach((specification: { key: string | Blob; value: string | Blob; }, index: any) => {
    formData.append(`specifications[${index}][key]`, specification.key ? specification.key : '-');
    formData.append(`specifications[${index}][value]`, specification.value ? specification.value : '-');
  });
  productData.vendor_prices.forEach((vendor_prices: { key: string | Blob; value: string | Blob }, index: any) => {
    formData.append(`vendor_prices[${index}][vendor_id]`, vendor_prices.key ? vendor_prices.key : '-');
    formData.append(`vendor_prices[${index}][price]`, vendor_prices.value ? vendor_prices.value : '-');
  });
  const res = await fetch(`${baseUrl}/products/${id}`, {
    method: 'PUT',
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

export const getAllProductsWithCategoryNames = async () => {
  const res = await fetch(`${baseUrl}/products/category`);
  const data = await res.json();  
  const products = data?.products?.map((product: any) => {
    return {
      id: product?._id,
      name: product?.product_name,
      category: product?.category_name,
      image: product?.product_image,
      n_shops: product?.vendor_prices?.length
    }
  }
  )
  return products;
}

export const getComparison = async (userId: string) => {
  const res = await fetch(`${baseUrl}/comparison/${userId}`);
  return await res.json();
}