import axios, { AxiosResponse } from 'axios';
import { Template } from '../utils/types';

// TODO
const baseUrl = 'http://127.0.0.1:8000';

export const getTemplates = async (): Promise<Template[]> => {
  const response: AxiosResponse<any[]> = await axios.get(baseUrl + '/templates/');
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
  const response: AxiosResponse<Template> = await axios.post(baseUrl + `/templates/`, {
    edition: editionId,
    name: name,
    description: description
  });
  return response.data;
};

export const deleteTemplate = async (templateId: number): Promise<Template> => {
  const response: AxiosResponse<Template> = await axios.delete(
    baseUrl + `/templates/${templateId}/`
  );
  return response.data;
};
