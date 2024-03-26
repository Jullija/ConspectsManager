import { Edition } from '../utils/types';
import axios from 'axios';

export const getEditions = async (subjectId: number): Promise<Edition[]> => {
  try {
    const response = await axios.get<Edition[]>(
      `http://localhost:8000/courses/${subjectId}/editions`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching editions:', error);
    return [];
  }
};
