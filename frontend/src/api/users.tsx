import axios from 'axios';
import { User } from '../utils/types';

export const getUsers = async (): Promise<User[]> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get<User[]>('http://127.0.0.1:8000/users/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};
