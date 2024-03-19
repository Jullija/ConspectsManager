import { Link } from "react-router-dom";
import { Subject } from "../../utils/types";
import { pathGenerator } from "../../router/paths";
import './styles/SubjectMenuStyle.css';

interface SubjectCardProps {
  subject: Subject;
}
const SubjectCard = ({ subject }: SubjectCardProps) => {
  return (
    <Link to={pathGenerator.subject(subject.id)}>
      <div className="subjectCard">{subject.name}</div>
    </Link>
  );
};

export default SubjectCard;
