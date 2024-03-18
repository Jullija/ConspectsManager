import { Link } from "react-router-dom";
import { Subject } from "../../utils/types";
import { pathGenerator } from "../../router/paths";

interface SubjectCardProps {
  subject: Subject;
}
const SubjectCard = ({ subject }: SubjectCardProps) => {
  return (
    <Link to={pathGenerator.subject(subject.id)}>
      <div style={{ border: "1px solid blue", padding: 40 }}>{subject.name}</div>
    </Link>
  );
};

export default SubjectCard;
