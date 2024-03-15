import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Edition } from "../../types/types";
import { getEditions } from "../../api/editions";
import EditionCard from "./EditionCard";

const Course = () => {
  const params = useParams();
  const courseId = Number(params.courseId);

  const [editions, setEditions] = useState<Edition[]>();

  useEffect(() => {
    setEditions(getEditions(courseId));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: 20,
      }}
    >
      <p>Course courseId: {courseId} </p>
      <Link to={`/add-edition/${courseId}`}>
        <button>add edition</button>
      </Link>
      {editions?.map((edition) => (
        <EditionCard edition={edition} courseId={courseId} />
      ))}
    </div>
  );
};

export default Course;
