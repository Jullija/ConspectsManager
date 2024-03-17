import { Link } from "react-router-dom";
import { Edition } from "../../types/types";
import { pathGenerator } from "../../router/paths";

interface EditionCardProps {
  edition: Edition;
  courseId: number;
}

const EditionCard = ({ edition, courseId }: EditionCardProps) => {
  return (
    <div
      style={{
        border: "1px solid blue",
        padding: 20,
      }}
    >
      {edition.name}
      <Link to={pathGenerator.Edition(courseId, edition.id)}>
        <button>edit</button>
      </Link>
    </div>
  );
};

export default EditionCard;
