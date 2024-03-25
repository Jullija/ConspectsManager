import axios, { AxiosResponse } from 'axios';
import { Subject } from '../utils/types';

// TODO
const baseUrl = 'http://127.0.0.1:8000';

export const getSubjects = async (): Promise<Subject[]> => {
  const response: AxiosResponse<Subject[]> = await axios.get(baseUrl + '/courses');
  return response.data;
};

export const addSubject = async (name: string, description: string): Promise<Subject> => {
  const response: AxiosResponse<Subject> = await axios.post(baseUrl + `/courses/`, {
    name: name,
    description: description
  });

  return response.data;
};
