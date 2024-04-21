import { Edition } from '../utils/types';
import { axiosClient } from './axiosClient';
import getToken from '../utils/tokenManager';

export const getEditions = async (subjectId: number): Promise<Edition[]> => {
  try {
    const token = getToken();
    const response = await axiosClient.get<Edition[]>(
      `/courses/${subjectId}/editions`, {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching editions:', error);
    return [];
  }
};
