import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Edition } from '../../utils/types';
import { getEditions } from '../../api/editions';
import EditionCard from './EditionCard';
import { pathGenerator } from '../../router/paths';
import { titleFontSize } from '../../utils/sizes';
import { Button } from 'semantic-ui-react';
import { colors } from '../../utils/colors';

const Subject = () => {
  const params = useParams();
  const subjectId = Number(params.subjectId);
  const navigate = useNavigate();

  const [editions, setEditions] = useState<Edition[]>();

  useEffect(() => {
    setEditions(getEditions(subjectId));
  }, []);

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
