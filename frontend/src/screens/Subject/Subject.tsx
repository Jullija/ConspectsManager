import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Button, Dropdown } from 'semantic-ui-react';
import EditionCard from './EditionCard';
import { getEditions } from '../../api/editions'; // Adjust imports as needed
import { getUsers } from '../../api/users'; // Adjust imports as needed
import { postUserEdition } from '../../api/userEditions'; // Adjust imports as needed
import { User } from '../../utils/types';
import { pathGenerator } from '../../router/paths';
import { titleFontSize } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { PermissionType } from '../../utils/types';
import { deleteEdition } from '../../api/editions';
import axios from 'axios';

const Subject = () => {
  const params = useParams();
  const subjectId = Number(params.subjectId);
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    data: editions,
    refetch
  } = useQuery('editions', () => getEditions(subjectId));

  const [showUsers, setShowUsers] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const { data: userList, refetch: refetchUsers } = useQuery('users', getUsers, {
    enabled: false, 
  });

  useEffect(() => {
    if (userList) {
      setUsers(userList);
    }
  }, [userList]);

  const handleShareSubject = () => {
    setShowUsers(!showUsers); // Toggle visibility of the user list
    if (!showUsers) {
      refetchUsers(); // Fetch users only when opening the list
    }
  };


  const handleCopyPermissions = async () => {
    if (!selectedUser || !editions) return;
    for (const edition of editions) {
      if (edition.user_permission === 'admin'){
        await postUserEdition(selectedUser, edition.id, 'owns');
      }else {
        await postUserEdition(selectedUser, edition.id, edition.user_permission as PermissionType);
      }

    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) navigate(pathGenerator.ErrorPage('something went wrong'));

  const handleDeleteEdition = async (editionId: number) => {
    try {
      await deleteEdition(subjectId, editionId);
      refetch();
    } catch (error) {
      navigate(
        pathGenerator.ErrorPage(
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data)
            : 'Something went wrong :('
        )
      );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '24px 20px'
      }}>
        <div style={{ fontSize: titleFontSize }}>Subject ID: {subjectId}</div>
        <Button style={{ backgroundColor: colors.blue, color: colors.white }} onClick={() => navigate(pathGenerator.AddEdition(subjectId))}>
          Add Edition
        </Button>
      </div>
      <Button onClick={handleShareSubject}>
        {showUsers ? 'Hide Users' : 'Share Subject'}
      </Button>

      {showUsers && (
        <>
          <Dropdown
            placeholder='Select User to Copy Permissions'
            fluid
            selection
            options={users.map(user => ({ key: user.id, text: user.username, value: user.id }))}
            onChange={(_, { value }) => setSelectedUser(value as number)}
          />
          <Button onClick={handleCopyPermissions} disabled={!selectedUser}>
            Copy Permissions
          </Button>
        </>
      )}

      {editions?.map((edition, index) => (
        <EditionCard key={index} edition={edition} subjectId={subjectId} withBottomBorder={index !== editions.length - 1} handleDeleteEdition={handleDeleteEdition}/>
      ))}

      
    </div>
  );
};

export default Subject;