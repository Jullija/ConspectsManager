import { Edition } from '../utils/types';
import axios from 'axios';
import { api_base } from './api_url';

export const getEditions = async (subjectId: number): Promise<Edition[]> => {
  try {
    const response = await axios.get<Edition[]>(
      `${api_base}/courses/${subjectId}/editions`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching editions:', error);
    return [];
  }
};
