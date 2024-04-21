import { Edition } from '../utils/types';
import getToken from '../utils/tokenManager';
import { axiosClient } from './axiosClient';

export const getEdition = async (
  subjectId: number,
  editioinId: number
): Promise<Edition | undefined> => {
  try {
    const token = getToken();
    const response = await axiosClient.get<Edition>(
      `/courses/${subjectId}/editions/${editioinId}`, {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching editions:', error);
    return;
  }
};
