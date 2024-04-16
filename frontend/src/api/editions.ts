import axios, { AxiosResponse } from 'axios';
import { Edition } from '../utils/types';
import getToken from '../utils/tokenManager';

const baseUrl = 'http://127.0.0.1:8000';

export const getEditions = async (subjectId: number): Promise<Edition[]> => {
  const token = getToken();

  const response: AxiosResponse<Edition[]> = await axios.get(
    baseUrl + `/courses/${subjectId}/editions/`, {
      headers: {
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
  const token = getToken();

  const response: AxiosResponse<Edition> = await axios.post(
    baseUrl + `/courses/${subjectId}/editions/`,
    {
      name: name,
      year: year
    },
    {
      headers: {
        Authorization: `Token ${token}`,
      }
    }
  );
  return response.data;
};

export const deleteEdition = async (subjectId: number, editionId: number): Promise<Edition> => {
  const token = getToken();
  
  const response: AxiosResponse<Edition> = await axios.delete(
    baseUrl + `/courses/${subjectId}/editions/${editionId}`, {
      headers: {
        Authorization: `Token ${token}`
      }
    }
  );
  return response.data;
};
