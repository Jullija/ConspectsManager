import axios, { AxiosResponse } from 'axios';
import { Edition } from '../utils/types';
import { api_base } from './api_url';

const baseUrl = api_base;

export const getEditions = async (subjectId: number): Promise<Edition[]> => {
  const response: AxiosResponse<Edition[]> = await axios.get(
    baseUrl + `/courses/${subjectId}/editions/`
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
