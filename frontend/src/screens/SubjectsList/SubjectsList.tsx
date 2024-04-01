import SubjectCard from './SubjectCard';
import CenteredMenu from '../../components/Menu';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { pathGenerator } from '../../router/paths';
import { useQuery } from 'react-query';
import { getSubjects } from '../../api/subjects';

const SubjectsList = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    data: subjects
  } = useQuery({ queryKey: ['subjects'], queryFn: getSubjects });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    navigate(pathGenerator.ErrorPage('something went wrong'));
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CenteredMenu itemTitles={['Sortuj po przedmiocie', 'Sortuj po roku']} />
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 20,
          justifyContent: 'center',
          marginTop: 40
        }}>
        {subjects?.map((subject, index) => {
          return <SubjectCard subject={subject} key={index} />;
        })}
      </div>

      <Button
        onClick={() => {
          navigate(pathGenerator.AddSubject);
        }}>
        dodaj przedmiot
      </Button>
    </>
  );
};

export default SubjectsList;
