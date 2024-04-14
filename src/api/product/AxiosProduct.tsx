// AxiosProduct.tsx
import { AxiosInstance, WEB_URL } from '../apiUrl.tsx';

export const getProducts = async () => {
  try {
    const data = await AxiosInstance().get('products');
    return data;
  } catch (error) {
    throw error;
  }
};

export const getProductsByCategory = async (categoryId: string) => {
  try {
    const data = await AxiosInstance().get('products/category/' + categoryId);
    return data;
  } catch (error) {
    throw error;
  }
};

// export const getProductById = async (productId: string) => {
//   try {
//     const data = await AxiosInstance().get('products/' + productId);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };


export const searchProduct = async (name: string) => {
  try {
    const data = await AxiosInstance().get('products/search/' + name);
    return data;
  } catch (error) {
    throw error;
  }
};
