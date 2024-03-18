import { Link } from "react-router-dom";
import { Edition } from "../../utils/types";
import { pathGenerator } from "../../router/paths";
import { colors } from "../../utils/colors";
import { Button } from "semantic-ui-react";
import { subtitleFontSize } from "../../utils/sizes";
import { useState } from "react";

interface EditionCardProps {
  edition: Edition;
  subjectId: number;
  withBottomBorder: boolean;
}

const EditionCard = ({
  edition,
  subjectId,
  withBottomBorder,
}: EditionCardProps) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        borderBottom: withBottomBorder ? "1px solid " + colors.grey : "none",
        color: colors.darkblue,
        cursor: "pointer",
        transform: "opacity 0.3s",
      }}
    >
      <div
        style={{
          fontSize: subtitleFontSize,
          opacity: hovered ? "0.7" : "1",
        }}
      >
        {edition.name}
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        <Link to={pathGenerator.Edition(subjectId, edition.id)}>
          <Button style={{ backgroundColor: colors.orange }}>edit</Button>
        </Link>
        <Button>delete</Button>
      </div>
    </div>
  );
};

export default EditionCard;
