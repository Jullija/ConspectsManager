import SubjectCard from './SubjectCard';
import CenteredMenu from '../../components/Menu';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { pathGenerator } from '../../router/paths';
import { useQuery } from 'react-query';
import { getSubjects } from '../../api/subjects';
import { colors } from '../../utils/colors';

const SubjectsList = () => {
  const navigate = useNavigate();
  const { isLoading, error, data: subjects } = useQuery('subjects', getSubjects);

  if (isLoading) {
    return <p>Ładowanie...</p>;
  }

  if (error) {
    navigate(pathGenerator.ErrorPage('something went wrong'));
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <Button
          onClick={() => {
            navigate(pathGenerator.AddSubject);
          }}
          style={{
            backgroundColor: colors.darkblue,
            color: colors.white
          }}>
          Dodaj przedmiot
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 20,
          justifyContent: 'center',
          marginTop: 40,
          marginBottom: 40
        }}>
        {subjects?.map((subject, index) => {
          return <SubjectCard subject={subject} key={index} />;
        })}
      </div>
    </>
  );
};

export default SubjectsList;
