import { Edition } from '../utils/types';
import { axiosClient } from './axiosClient';

export const getEditions = async (subjectId: number): Promise<Edition[]> => {
  try {
    const response = await axiosClient.get<Edition[]>(
      `/courses/${subjectId}/editions`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching editions:', error);
    return [];
  }
};
