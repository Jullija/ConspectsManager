import axios from 'axios';
import { UserEdition, PermissionType} from '../utils/types';
import { axiosClient } from './axiosClient';


type UpdateUserEditionParams = {
  id: number;
  permissionType: PermissionType;
};

export const deleteUserEdition = async (id: number) => {

    try {
      await axiosClient.delete(`/user-editions/${id}/`);
      return true;
    } catch (error) {
      console.error('Error deleting user edition:', error);
      return false;
    }
  };

  export const updateUserEdition = async (params: UpdateUserEditionParams): Promise<UserEdition | null> => {

    console.log("Updating User Edition with params:", params);
    try {
        const response = await axiosClient.patch<UserEdition>(
            `/user-editions/${params.id}/`,
            { permission_type: params.permissionType } // Only update permission_type
        );
        console.log("Update successful", response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating user edition:', error);
        return null;
    }
};

export const getUserEditions = async ({
  userId,
  editionId
}: { userId?: number; editionId?: number }): Promise<UserEdition[]> => {
  try {

    let url = '/user-editions/';
    if (userId) {
      url += `?user=${userId}`;
    } else if (editionId) {
      url += `?edition=${editionId}`;
    }

    const response = await axiosClient.get<UserEdition[]>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching user editions:', error);
    return [];
  }
};


export const getUserEditionsByEdition = async (editionId: number): Promise<UserEdition[]> => {
  try {

    const response = await axiosClient.get<UserEdition[]>(
      `/user-editions/?edition=${editionId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user editions by edition:', error);
    return [];
  }
};
export const postUserEdition = async (userId: number, editionId: number, permissionType: PermissionType) => {

    try {
      await axiosClient.post('/user-editions/', {
        user: userId,
        edition: editionId,
        permission_type: permissionType
      });
      return true;
    } catch (error) {
      console.error('Error posting user edition:', error);
      return false;
    }
};