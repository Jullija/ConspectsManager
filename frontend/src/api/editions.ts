import axios, { AxiosResponse } from 'axios';
import { Edition } from '../utils/types';

const baseUrl = 'http://127.0.0.1:8000';

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
