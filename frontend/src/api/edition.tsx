import { Edition } from '../utils/types';
import { axiosClient } from './axiosClient';

export const getEdition = async (
  subjectId: number,
  editioinId: number
): Promise<Edition | undefined> => {
  try {
    const response = await axiosClient.get<Edition>(
      `/courses/${subjectId}/editions/${editioinId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching editions:', error);
    return;
  }
};
