import { useNavigate, useParams } from "react-router-dom";

const AccessRightsPanel = () => {
  const params = useParams();
  const editionId = Number(params.editionId);
  const courseId = Number(params.courseId);

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(`/edition/${courseId}/${editionId}`);
  };

  const handleConfrim = () => {
    navigate(`/edition/${courseId}/${editionId}`);
  };

  return (
    <>
      <p>
        AccessRightsPanel courseId: {courseId} editionId: {editionId}
      </p>
      <button onClick={handleCancel}>cancel</button>
      <button onClick={handleConfrim}>confirm</button>
    </>
  );
};

export default AccessRightsPanel;
