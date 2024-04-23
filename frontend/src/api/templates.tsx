import { AxiosResponse } from 'axios';
import { Template } from '../utils/types';
import { axiosClient } from './axiosClient';
// TODO

export const getTemplates = async (): Promise<Template[]> => {
  const response: AxiosResponse<any[]> = await axiosClient.get('/templates/');
  return response.data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      folders: JSON.parse(item.structure)
    };
  });
};

export const addTemplate = async (
  editionId: number,
  name: string,
  description: string
): Promise<Template> => {
  const response: AxiosResponse<Template> = await axiosClient.post(`/templates/`, {
    edition: editionId,
    name: name,
    description: description
  });
  return response.data;
};

export const deleteTemplate = async (templateId: number): Promise<Template> => {
  const response: AxiosResponse<Template> = await axiosClient.delete(
    `/templates/${templateId}/`
  );
  return response.data;
};
