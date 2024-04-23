import { User } from '../utils/types';
import { axiosClient } from './axiosClient';


export const getUser = async (
  userId: number
): Promise<User | undefined> => {
  try {    
    const response = await axiosClient.get<User>(
      `/users/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return;
  }
};
