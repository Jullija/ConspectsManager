import { AxiosResponse } from 'axios';
import { Edition } from '../utils/types';
import { axiosClient } from './axiosClient';

export const getEditions = async (subjectId: number): Promise<Edition[]> => {
  const response: AxiosResponse<Edition[]> = await axiosClient.get(
    `/courses/${subjectId}/editions/`
  );
  return response.data;
};

export const addEdition = async (
  subjectId: number,
  name: string,
  year: number
): Promise<Edition> => {
  const response: AxiosResponse<Edition> = await axiosClient.post(
    `/courses/${subjectId}/editions/`,
    {
      name: name,
      year: year
    }
  );
  return response.data;
};

export const deleteEdition = async (subjectId: number, editionId: number): Promise<Edition> => {
  const response: AxiosResponse<Edition> = await axiosClient.delete(
    `/courses/${subjectId}/editions/${editionId}`
  );
  return response.data;
};
