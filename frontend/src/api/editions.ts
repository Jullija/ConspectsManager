import axios, { AxiosResponse } from 'axios';
import { Edition } from '../utils/types';

const baseUrl = 'http://127.0.0.1:8000';

export const getEditions = async (subjectId: number): Promise<Edition[]> => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem('token');

  const response: AxiosResponse<Edition[]> = await axios.get(
    baseUrl + `/courses/${subjectId}/editions/`, {
      headers: {
        // Include the token in the Authorization header
        Authorization: `Token ${token}`
      }
    }
  );
  return response.data;
};

export const addEdition = async (
  subjectId: number,
  name: string,
  year: number
): Promise<Edition> => {
  const response: AxiosResponse<Edition> = await axios.post(
    baseUrl + `/courses/${subjectId}/editions/`,
    {
      name: name,
      year: year
    }
  );
  return response.data;
};

export const deleteEdition = async (subjectId: number, editionId: number): Promise<Edition> => {
  const response: AxiosResponse<Edition> = await axios.delete(
    baseUrl + `/courses/${subjectId}/editions/${editionId}`
  );
  return response.data;
};
