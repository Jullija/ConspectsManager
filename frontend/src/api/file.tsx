import { File } from '../utils/types';
import axios from 'axios';
import getToken from '../utils/tokenManager';

export const getFile = async (fileId: number): Promise<File | undefined> => {
  try {
    const token = getToken();
    
    const response = await axios.get<File>(`http://localhost:8000/files/${fileId}`, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching editions:', error);
    return;
  }
};
