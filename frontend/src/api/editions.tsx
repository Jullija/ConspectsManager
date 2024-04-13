import { Edition } from '../utils/types';
import axios from 'axios';

export const getEditions = async (subjectId: number): Promise<Edition[]> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get<Edition[]>(
      `http://localhost:8000/courses/${subjectId}/editions`, {
        headers: {
          // Include the token in the Authorization header
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
