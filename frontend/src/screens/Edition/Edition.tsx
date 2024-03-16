import { Link, useParams } from "react-router-dom";
import { pathGenerator } from "../../router/paths";

const Edition = () => {
  const params = useParams();
  const editionId = Number(params.editionId);
  const courseId = Number(params.courseId);

  return (
    <>
      <p>
        Edition courseId: {courseId} editionId: {courseId}
      </p>
      <Link to={pathGenerator.Course(courseId)}>
        <button>go back to course</button>
      </Link>
      <Link to={pathGenerator.AccessRights(courseId, editionId)}>
        <button>access rights</button>
      </Link>
    </>
  );
};

export default Edition;
