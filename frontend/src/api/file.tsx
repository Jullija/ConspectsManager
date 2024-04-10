import { File } from '../utils/types';
import axios from 'axios';
import { api_base } from './api_url';

export const getFile = async (fileId: number): Promise<File | undefined> => {
  try {
    const response = await axios.get<File>(`${api_base}/files/${fileId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching editions:', error);
    return;
  }
};
