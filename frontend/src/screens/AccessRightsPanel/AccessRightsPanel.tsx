import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { pathGenerator } from '../../router/paths';
import { getUserEditionsByEdition, updateUserEdition, deleteUserEdition, postUserEdition} from '../../api/usereditions';
import { getUsers} from '../../api/users';
import { getUser} from '../../api/user';
import { UserEdition, User } from '../../utils/types';

const AccessRightsPanel = () => {
  const [permissions, setPermissions] = useState<UserEdition[]>([]);
  const [stagedPermissions, setStagedPermissions] = useState<PermissionChanges>({});
  const [editingPermissionId, setEditingPermissionId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [stagedDeletions, setStagedDeletions] = useState<number[]>([]);
  const [showUsers, setShowUsers] = useState(false);

  const params = useParams();
  const editionId = Number(params.editionId);
  const subjectId = Number(params.subjectId);

  const navigate = useNavigate();
  
  type PermissionChanges = {
    [key: number]: 'view' | 'edit' | 'owns';
  };
  
  useEffect(() => {
    const fetchPermissions = async () => {
      if (editionId) {
        const fetchedPermissions = await getUserEditionsByEdition(editionId);
        const userFetchPromises = fetchedPermissions.map(async (perm) => {
          const userDetails = await getUser(perm.user);
          return {...perm, userDetails}; // Append user details to each permission
        });
        const permissionsWithUsers = await Promise.all(userFetchPromises);
        setPermissions(permissionsWithUsers);
      }
    };
  
    fetchPermissions();
  }, [editionId]);
  const handleCancel = () => {
    navigate(pathGenerator.Edition(subjectId, editionId));
  };

  const handleShareEdition = async () => {
    const existingUserIds = permissions.map(perm => perm.user);
    const fetchedUsers = await getUsers();
    const filteredUsers = fetchedUsers.filter(user => !existingUserIds.includes(user.id));
    setUsers(filteredUsers);
    setShowUsers(true);
  };

  const handleAssignView = async (userId: number) => {
    console.log(userId)
    const success = await postUserEdition(userId, editionId, 'view');
    if (success) {
      setShowUsers(false);
  
      // After successfully granting permission, update the permissions state
      const newUser = await getUser(userId);
      if (newUser){
        setPermissions(prevPermissions => [...prevPermissions, {
          id: newUser.id,
          user: newUser.id,
          permission_type: 'view',
          userDetails: newUser,
          edition: editionId // Add the edition ID to the newly added permission
        }]);
      } // Fetch details of the newly added user
      
    }
  };
  
  const handleConfirm = async () => {
    const updatePromises = Object.entries(stagedPermissions).map(async ([id, permissionType]) => {
      return updateUserEdition({
        id: Number(id),
        permissionType
      });
    });
  
    const deletePromises = stagedDeletions.map(async (id) => {
      return deleteUserEdition(id);
    });
  
    // Wait for all updates and deletions to complete
    await Promise.all([...updatePromises, ...deletePromises]);
  
    // Update the main permissions state
    setPermissions(prev => prev.filter(perm => !stagedDeletions.includes(perm.id)).map(perm => ({
      ...perm,
      permissionType: perm.id in stagedPermissions ? stagedPermissions[perm.id] : perm.permission_type
    })));
  
    // Clear staged changes and deletions
    setStagedPermissions({});
    setStagedDeletions([]);
    navigate(pathGenerator.Edition(subjectId, editionId));
  };

  // const handlePermissionChange = async (id: number, newPermission: 'view' | 'edit' | 'owns') => {
  //   const updateResult = await updateUserEdition({
  //     id: id,
  //     permissionType: newPermission
  //   });
  //   if (updateResult) {
  //     setPermissions(permissions.map(perm => {
  //       if (perm.id === id) {
  //         return { ...perm, permission_type: newPermission }; 
  //       }
  //       return perm;
  //     }));
  //     setEditingPermissionId(null);
  //   }
  // };
  const handlePermissionChange = (id: number, newPermission: 'view' | 'edit' | 'owns') => {
    setStagedPermissions(prev => ({
      ...prev,
      [id]: newPermission
    }));
  };

  const handleDelete = (id: number) => {
    setStagedDeletions(prev => [...prev, id]);
  };

  const showDropdown = (id: number) => {
    console.log(permissions)
    setEditingPermissionId(id);
  };



  const availablePermissions = ['view', 'edit', 'owns'];

  return (
    <>
      <p>AccessRightsPanel subjectId: {subjectId} editionId: {editionId}</p>
      {permissions.map((perm) => (
        <div key={perm.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', opacity: stagedDeletions.includes(perm.id) ? 0.5 : 1 }}>
          <span>{perm.userDetails ? perm.userDetails.username : 'Loading...'}</span>
          {perm.permission_type === 'owns' ? (
            <span style={{ fontWeight: 'bold', color: 'darkgreen' }}>{perm.permission_type.toUpperCase()}</span>
          ) : (
            <>
              {editingPermissionId === perm.id ?
                <select
                  value={stagedPermissions[perm.id] || perm.permission_type}
                  onChange={(e) => handlePermissionChange(perm.id, e.target.value as 'view' | 'edit' | 'owns')}
                  onBlur={() => setEditingPermissionId(null)}
                >
                  {availablePermissions.map(option => (
                    <option key={option} value={option}>{option.toUpperCase()}</option>
                  ))}
                </select>
                :
                <span style={{ fontWeight: 'bold', color: 'navy', cursor: 'pointer' }}
                      onClick={() => showDropdown(perm.id)}>
                  {(stagedPermissions[perm.id] || perm.permission_type).toUpperCase()}
                </span>
              }
              <button onClick={() => handleDelete(perm.id)} style={{ marginLeft: '10px' }}>Delete</button>
            </>
          )}
        </div>
      ))}
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleConfirm}>Confirm</button>
      <button onClick={handleShareEdition}>Share Edition</button>
      {showUsers && (
        <div>
          <h3>Select a user to grant permission (does not need confirmation):</h3>
          <ul>
            {users.map(user => (

              <li key={user.id} onClick={() => handleAssignView(user.id)}>
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
  
};

export default AccessRightsPanel;
