// AxiosCategory.tsx
import { AxiosInstance, WEB_URL } from '../apiUrl.tsx';

export const getCategories = async () => {
  try {
    const data = await AxiosInstance().get('categories');
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCategory = async (id: string) => {
  try {
    const data = await AxiosInstance().get('categories/' + id);
    return data;
  } catch (error) {
    throw error;
  }
};
