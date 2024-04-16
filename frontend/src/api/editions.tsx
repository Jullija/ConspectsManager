import { Edition } from '../utils/types';
import axios from 'axios';
import getToken from '../utils/tokenManager';

export const getEditions = async (subjectId: number): Promise<Edition[]> => {
  try {
    const token = getToken();
    
    const response = await axios.get<Edition[]>(
      `http://localhost:8000/courses/${subjectId}/editions`, {
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
