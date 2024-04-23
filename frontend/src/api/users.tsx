import axios from 'axios';
import { User } from '../utils/types';
import { axiosClient } from './axiosClient';

export const getUsers = async (): Promise<User[]> => {
  try {    
    const response = await axiosClient.get<User[]>('/users/');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};
