import { Edition } from '../utils/types';
import axios from 'axios';

export const getEdition = async (
  subjectId: number,
  editioinId: number
): Promise<Edition | undefined> => {
  try {
    const response = await axios.get<Edition>(
      `http://localhost:8000/courses/${subjectId}/editions/${editioinId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching editions:', error);
    return;
  }
};
