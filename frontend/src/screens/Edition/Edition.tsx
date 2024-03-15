import { Link, useParams } from "react-router-dom";

const Edition = () => {
  const params = useParams();
  const editionId = Number(params.editionId);
  const courseId = Number(params.courseId);

  return (
    <>
      <p>
        Edition courseId: {courseId} editionId: {courseId}
      </p>
      <Link to={`/course/${courseId}`}>
        <button>go back to course</button>
      </Link>
      <Link to={`/access-rights-panel/${courseId}/${editionId}`}>
        <button>access rights</button>
      </Link>
    </>
  );
};

export default Edition;
