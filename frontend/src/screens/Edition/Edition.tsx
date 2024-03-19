import { Link, useParams } from 'react-router-dom';
import { pathGenerator } from '../../router/paths';

const Edition = () => {
  const params = useParams();
  const editionId = Number(params.editionId);
  const subjectId = Number(params.subjectId);

  return (
    <>
      <p>
        Edition subjectId: {subjectId} editionId: {subjectId}
      </p>
      <Link to={pathGenerator.subject(subjectId)}>
        <button>go back to subject</button>
      </Link>
      <Link to={pathGenerator.AccessRights(subjectId, editionId)}>
        <button>access rights</button>
      </Link>
    </>
  );
};

export default Edition;
