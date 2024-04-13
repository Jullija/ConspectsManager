import axios from 'axios';
import { UserEdition, PermissionType} from '../utils/types';


type UpdateUserEditionParams = {
  id: number;
  permissionType: PermissionType;  // Adjust as needed based on your types
};

export const deleteUserEdition = async (id: number) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://127.0.0.1:8000/user-editions/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return true;
    } catch (error) {
      console.error('Error deleting user edition:', error);
      return false;
    }
  };

  export const updateUserEdition = async (params: UpdateUserEditionParams): Promise<UserEdition | null> => {
    const token = localStorage.getItem('token');
    console.log("Updating User Edition with params:", params);
    try {
        const response = await axios.patch<UserEdition>(
            `http://127.0.0.1:8000/user-editions/${params.id}/`,
            { permission_type: params.permissionType }, // Only update permission_type
            {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log("Update successful", response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating user edition:', error);
        return null;
    }
};

// Function to get user-edition permissions by user ID or edition ID
export const getUserEditions = async ({
  userId,
  editionId
}: { userId?: number; editionId?: number }): Promise<UserEdition[]> => {
  try {
    const token = localStorage.getItem('token');
    let url = 'http://127.0.0.1:8000/user-editions/';
    if (userId) {
      url += `?user=${userId}`;
    } else if (editionId) {
      url += `?edition=${editionId}`;
    }

    const response = await axios.get<UserEdition[]>(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user editions:', error);
    return [];
  }
};


export const getUserEditionsByEdition = async (editionId: number): Promise<UserEdition[]> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get<UserEdition[]>(
      `http://127.0.0.1:8000/user-editions/?edition=${editionId}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user editions by edition:', error);
    return [];
  }
};
export const postUserEdition = async (userId: number, editionId: number, permissionType: PermissionType) => {
    const token = localStorage.getItem('token');
    // Debugging logs
    console.log("Posting new UserEdition with:", { userId, editionId, permissionType });

    try {
      await axios.post('http://127.0.0.1:8000/user-editions/', {
        user: userId,
        edition: editionId,
        permission_type: permissionType
      }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log("Post successful");
      return true;
    } catch (error) {
      console.error('Error posting user edition:', error);
      return false;
    }
};