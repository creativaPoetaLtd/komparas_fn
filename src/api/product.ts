import { baseUrl } from '.';
import axios from "axios";

export const getAllProducts = async (minPrice?: number, maxPrice?: number, categoryId?: string[], vendorId?: string[], ram?: string[], storage?: string[], camera?: string[], colors?: string[], screen?: string[]) => {
  let url = `${baseUrl}/products?`;
  if (minPrice && maxPrice) {
    url += `minPrice=${minPrice}&maxPrice=${maxPrice}`;
  }
  if (categoryId && Array.isArray(categoryId) && categoryId.length > 0) {
    url += `&category=${categoryId.join(',')}`;
  }
  if(vendorId && Array.isArray(vendorId) && vendorId.length > 0) {
    url += `&vendor_id=${vendorId.join(',')}`;
  }
  // if (vendorId && Array.isArray(vendorId) && vendorId.length > 0) {
  //   url += `&vendor_id=${vendorId.join(',')}`;
  // }
  if (ram && Array.isArray(ram) && ram.length > 0) {
    const numericRam = ram.map(r => r.match(/\d+/)?.[0]).filter(Boolean); 
    if (numericRam.length > 0) {
      url += `&ram=${numericRam.join(',')}`;
    }
  }
  if (storage && Array.isArray(storage) && storage.length > 0) {
    url += `&storage=${storage.join(',')}`;
  }
  if (camera && Array.isArray(camera) && camera.length > 0) {
    url += `&camera=${camera.join(',')}`;
  }
  if (colors && Array.isArray(colors) && colors.length > 0) {
    url += `&colors=${colors.join(',')}`;
  }
  if (screen && Array.isArray(screen) && screen.length > 0) {
    url += `&screen=${screen.join(',')}`;
  }

  const res = await axios.get(url);
  return res;
};

export const getProductByVendorId = async (vendorId: string[]) => {
  const res = axios.get(`${baseUrl}/products?vendor_id=${vendorId}`);
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

  productData?.product_specifications.forEach((product_specifications: { key: string | Blob; value: string | Blob; }, index: any) => {
    formData.append(`product_specifications[${index}][key]`, product_specifications.key ? product_specifications.key : '-');
    formData.append(`product_specifications[${index}][value]`, product_specifications.value ? product_specifications.value : '-');
  });

  productData.our_review.forEach((our_review: { key: string | Blob; value: string | Blob; }, index: any) => {
    formData.append(`our_review[${index}][key]`, our_review.key ? our_review.key : '-');
    formData.append(`our_review[${index}][value]`, our_review.value ? our_review.value : '-');
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
  return await axios.put(`${baseUrl}/products/${id}`, productData);
}
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