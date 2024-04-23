import { AxiosResponse } from 'axios';
import { Edition } from '../utils/types';
import getToken from '../utils/tokenManager';
import { axiosClient } from './axiosClient';

export const getEditions = async (subjectId: number): Promise<Edition[]> => {
  const token = getToken();

  const response: AxiosResponse<Edition[]> = await axiosClient.get(
    `/courses/${subjectId}/editions/`, {
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

  const response: AxiosResponse<Edition> = await axiosClient.post(
     `/courses/${subjectId}/editions/`,
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

export const addEditionWithTemplate = async (
  subjectId: number,
  name: string,
  year: number,
  templateId: number
): Promise<Edition> => {
  const response: AxiosResponse<Edition> = await axiosClient.post(
    `/courses/${subjectId}/editions/`,
    {
      name: name,
      year: year
    }
  );
  const edition: Edition = response.data;

  await axiosClient.post(`/templates/${templateId}/apply/`, {
    root_folder_id: edition.root_folder
  });

  const response2: AxiosResponse<Edition> = await axiosClient.get(
    `/courses/${subjectId}/editions/${edition.id}`
  );

  return response2.data;
};

export const deleteEdition = async (subjectId: number, editionId: number): Promise<Edition> => {
  const token = getToken();
  
  const response: AxiosResponse<Edition> = await axiosClient.delete(
    `/courses/${subjectId}/editions/${editionId}`, {
      headers: {
        Authorization: `Token ${token}`
      }
    }
  );
  return response.data;
};
