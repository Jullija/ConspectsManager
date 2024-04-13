import { User } from '../utils/types';
import axios from 'axios';

export const getUser = async (
  userId: number
): Promise<User | undefined> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get<User>(
      `http://127.0.0.1:8000/users/${userId}`, {
        headers: {
          // Include the token in the Authorization header
          Authorization: `Token ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return;
  }
};
