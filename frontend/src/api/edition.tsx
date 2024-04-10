import { Edition } from '../utils/types';
import axios from 'axios';
import { api_base } from './api_url';

export const getEdition = async (
  subjectId: number,
  editioinId: number
): Promise<Edition | undefined> => {
  try {
    const response = await axios.get<Edition>(
      `${api_base}/courses/${subjectId}/editions/${editioinId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching editions:', error);
    return;
  }
};
