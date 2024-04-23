import { File } from '../utils/types';
import { axiosClient } from './axiosClient';
import getToken from '../utils/tokenManager';

export const getFile = async (fileId: number): Promise<File | undefined> => {
  try {
    const token = getToken();
    
    const response = await axiosClient.get<File>(`/files/${fileId}`, {
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
