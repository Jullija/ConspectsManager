import { useParams } from "react-router-dom";

const Course = () => {
  const { id } = useParams();

  return <p>Course id: {id}</p>;
};

export default Course;
