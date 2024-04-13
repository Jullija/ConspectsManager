import axios, { AxiosResponse } from 'axios';
import { Subject } from '../utils/types';

// TODO
const baseUrl = 'http://127.0.0.1:8000';

export const getSubjects = async (): Promise<Subject[]> => {
  const token = localStorage.getItem('token');
  const response: AxiosResponse<Subject[]> = await axios.get(baseUrl + '/courses', {
      headers: {
        // Include the token in the Authorization header
        Authorization: `Token ${token}`
      }
    }
  );
  return response.data;
};

export const addSubject = async (name: string, description: string): Promise<Subject> => {
  const token = localStorage.getItem('token');
  const response: AxiosResponse<Subject> = await axios.post(baseUrl + `/courses/`, {
    name: name,
    description: description
  }, {
    headers: {
      // Include the token in the Authorization header
      Authorization: `Token ${token}`
    }
  });

  return response.data;
};
