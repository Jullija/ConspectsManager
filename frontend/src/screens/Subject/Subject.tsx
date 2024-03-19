import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Edition } from '../../utils/types';
import { getEditions } from '../../api/editions';
import EditionCard from './EditionCard';
import { pathGenerator } from '../../router/paths';

const Subject = () => {
  const params = useParams();
  const subjectId = Number(params.subjectId);

  const [editions, setEditions] = useState<Edition[]>();

  useEffect(() => {
    setEditions(getEditions(subjectId));
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: 20
      }}
    >
      <p>subject subjectId: {subjectId} </p>
      <Link to={pathGenerator.AddEdition(subjectId)}>
        <button>add edition</button>
      </Link>
      {editions?.map((edition, index) => (
        <EditionCard key={index} edition={edition} subjectId={subjectId} />
      ))}
    </div>
  );
};

export default Subject;
