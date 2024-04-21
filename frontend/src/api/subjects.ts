import { AxiosResponse } from 'axios';
import { Subject } from '../utils/types';
import getToken from '../utils/tokenManager';
import { axiosClient } from './axiosClient';

export const getSubjects = async (): Promise<Subject[]> => {
  const token = getToken();

  const response: AxiosResponse<Subject[]> = await axiosClient.get('/courses', {
      headers: {
        Authorization: `Token ${token}`
      }
    }
  )
  return response.data;
};

export const addSubject = async (name: string, description: string): Promise<Subject> => {
  const token = getToken();
  
  const response: AxiosResponse<Subject> = await axiosClient.post(`/courses/`, {
    name: name,
    description: description
  }, {
    headers: {
      Authorization: `Token ${token}`
    }
  });
  return response.data;
};
