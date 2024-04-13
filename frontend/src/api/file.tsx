import { File } from '../utils/types';
import axios from 'axios';

export const getFile = async (fileId: number): Promise<File | undefined> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get<File>(`http://localhost:8000/files/${fileId}`, {
      headers: {
        // Include the token in the Authorization header
        Authorization: `Token ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching editions:', error);
    return;
  }
};
