import { AxiosResponse } from 'axios';
import { Subject } from '../utils/types';
import { axiosClient } from './axiosClient';

export const getSubjects = async (): Promise<Subject[]> => {
  const response: AxiosResponse<Subject[]> = await axiosClient.get('/courses');
  return response.data;
};

export const addSubject = async (name: string, description: string): Promise<Subject> => {
  const response: AxiosResponse<Subject> = await axiosClient.post(`/courses/`, {
    name: name,
    description: description
  });
  return response.data;
};
