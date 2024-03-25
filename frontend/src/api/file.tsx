import { File } from '../utils/types';
import axios from 'axios';

export const getFile = async (fileId: number): Promise<File | undefined> => {
  try {
    const response = await axios.get<File>(`http://localhost:8000/files/${fileId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching editions:', error);
    return;
  }
};
