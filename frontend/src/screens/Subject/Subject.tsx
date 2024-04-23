import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Button, Container, Dropdown, Dimmer, Loader } from 'semantic-ui-react';
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
import { axiosClient } from '../../api/axiosClient';

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

  const [courseName, setCourseName] = useState('');

  const getSubjectName = async (subjectId: number) => {
    const { data } = await axiosClient.get(`/courses/`);
    // Assuming data is an array of courses and each course has an 'id' and 'name' attribute
    const course = data.find((course: { id: number }) => course.id === subjectId);
    setCourseName(course ? course.name : null);
    return course ? course.name : null; // Return the course name or null if not found
  };
  const [showUsers, setShowUsers] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const { data: userList, refetch: refetchUsers } = useQuery('users', getUsers, {
    enabled: false
  });

  getSubjectName(subjectId);
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
      if (edition.user_permission === 'admin') {
        await postUserEdition(selectedUser, edition.id, 'owns');
      } else {
        await postUserEdition(selectedUser, edition.id, edition.user_permission as PermissionType);
      }
    }
  };

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
    <Container style={{ width: '60vw' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '24px 20px'
          }}>
          <div style={{ fontSize: titleFontSize }}>{courseName}</div>
          <Button
            style={{ backgroundColor: colors.blue, color: colors.white }}
            onClick={() => navigate(pathGenerator.AddEdition(subjectId))}>
            Add Edition
          </Button>
        </div>
        <Button onClick={handleShareSubject}>{showUsers ? 'Hide Users' : 'Share Subject'}</Button>

        {showUsers && (
          <>
            <Dropdown
              placeholder="Select User to Copy Permissions"
              fluid
              selection
              options={users.map((user) => ({
                key: user.id,
                text: user.username,
                value: user.id
              }))}
              onChange={(_, { value }) => setSelectedUser(value as number)}
            />
            <Button onClick={handleCopyPermissions} disabled={!selectedUser}>
              Copy Permissions
            </Button>
          </>
        )}
        {isLoading && (
          <Dimmer active inverted>
            <Loader>Loading</Loader>
          </Dimmer>
        )}

        {editions && editions.length > 0 ? (
          editions.map((edition, index) => (
            <EditionCard
              key={index}
              edition={edition}
              subjectId={subjectId}
              withBottomBorder={index !== editions.length - 1}
              handleDeleteEdition={handleDeleteEdition}
              refetch={refetch}
            />
          ))
        ) : (
          <p>No editions available.</p>
        )}
      </div>
    </Container>
  );
};

export default Subject;
