import { Link } from "react-router-dom";
import { Course } from "../../types/types";
import { pathGenerator } from "../../router/paths";

interface CourseCardProps {
  course: Course;
}
const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Link to={pathGenerator.Course(course.id)}>
      <div style={{ border: "1px solid blue", padding: 40 }}>{course.name}</div>
    </Link>
  );
};

export default CourseCard;
