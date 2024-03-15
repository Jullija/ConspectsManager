import { Link } from "react-router-dom";
import { Edition } from "../../types/types";

interface EditionCardProps {
  edition: Edition;
}

const EditionCard = ({ edition }: EditionCardProps) => {
  return (
    <div
      style={{
        border: "1px solid blue",
        padding: 20,
      }}
    >
      {edition.name}
      <Link to={`/edition/${edition.id}`}>
        <button>edit</button>
      </Link>
    </div>
  );
};

export default EditionCard;
