// AxiosUsers.tsx
import { AxiosInstance, WEB_URL } from '../apiUrl.tsx';

export const registerUser = async (user: { name: string; email: string; phone: string; password: string; }) => {
  try {
    const data = await AxiosInstance().post('Users/register', user);
    return data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (credentials: { password: string; phone: string }) => {
  try {
    const data = await AxiosInstance().post('Users/login', credentials);
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id: string, user: { phone: any; name: any; email: any }) => {
  try {
    const data = await AxiosInstance().put('Users/' + id, user);
    return data;
  } catch (error) {
    throw error;
  }
};
