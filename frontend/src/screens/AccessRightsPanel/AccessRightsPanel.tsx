import { useNavigate, useParams } from "react-router-dom";
import { pathGenerator } from "../../router/paths";

const AccessRightsPanel = () => {
  const params = useParams();
  const editionId = Number(params.editionId);
  const subjectId = Number(params.subjectId);

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(pathGenerator.Edition(subjectId, editionId));
  };

  const handleConfrim = () => {
    navigate(pathGenerator.Edition(subjectId, editionId));
  };

  return (
    <>
      <p>
        AccessRightsPanel subjectId: {subjectId} editionId: {editionId}
      </p>
      <button onClick={handleCancel}>cancel</button>
      <button onClick={handleConfrim}>confirm</button>
    </>
  );
};

export default AccessRightsPanel;
