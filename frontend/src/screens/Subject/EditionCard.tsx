import { Link } from "react-router-dom";
import { Edition } from "../../types/types";
import { pathGenerator } from "../../router/paths";

interface EditionCardProps {
  edition: Edition;
  subjectId: number;
}

const EditionCard = ({ edition, subjectId }: EditionCardProps) => {
  return (
    <div
      style={{
        border: "1px solid blue",
        padding: 20,
      }}
    >
      {edition.name}
      <Link to={pathGenerator.Edition(subjectId, edition.id)}>
        <button>edit</button>
      </Link>
    </div>
  );
};

export default EditionCard;
