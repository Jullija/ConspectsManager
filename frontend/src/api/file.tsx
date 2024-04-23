import { File } from '../utils/types';
import { axiosClient } from './axiosClient';

export const getFile = async (fileId: number): Promise<File | undefined> => {
  try {    
    const response = await axiosClient.get<File>(`/files/${fileId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching editions:', error);
    return;
  }
};
