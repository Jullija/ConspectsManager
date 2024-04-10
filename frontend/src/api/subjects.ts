import axios, { AxiosResponse } from 'axios';
import { Subject } from '../utils/types';
import { api_base } from './api_url';

// TODO
const baseUrl = api_base;

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
