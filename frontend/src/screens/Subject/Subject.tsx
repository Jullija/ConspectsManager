import { useNavigate, useParams } from 'react-router-dom';
import EditionCard from './EditionCard';
import { pathGenerator } from '../../router/paths';
import { titleFontSize } from '../../utils/sizes';
import { Button } from 'semantic-ui-react';
import { colors } from '../../utils/colors';
import { getEditions } from '../../api/editions';
import { useQuery } from 'react-query';

const Subject = () => {
  const params = useParams();
  const subjectId = Number(params.subjectId);
  const navigate = useNavigate();
  const { isLoading, error, data: editions } = useQuery('editions', () => getEditions(subjectId));

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    navigate(pathGenerator.ErrorPage('something went wrong'));
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '24px 20px'
        }}>
        <div style={{ fontSize: titleFontSize }}>subject subjectId: {subjectId}</div>

        <Button
          style={{ backgroundColor: colors.blue, color: colors.white }}
          onClick={() => navigate(pathGenerator.AddEdition(subjectId))}>
          add edition
        </Button>
      </div>

      {editions?.map((edition, index) => (
        <EditionCard
          key={index}
          edition={edition}
          subjectId={subjectId}
          withBottomBorder={index !== editions.length - 1}
        />
      ))}
    </div>
  );
};

export default Subject;
