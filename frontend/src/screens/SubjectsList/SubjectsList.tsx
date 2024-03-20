import { useEffect, useState } from 'react';
import { Subject } from '../../utils/types';
import SubjectCard from './SubjectCard';
import { getSubjects } from '../../api/subjects';
import CenteredMenu from './SubjectMenu';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { pathGenerator } from '../../router/paths';

const SubjectsList = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<Subject[]>();

  useEffect(() => {
    setSubjects(getSubjects());
  }, []);

  return (
    <>
      <CenteredMenu />

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
