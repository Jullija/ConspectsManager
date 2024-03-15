import { useNavigate, useParams } from "react-router-dom";

const AccessRightsPanel = () => {
  const params = useParams();
  const editionId = Number(params.id);

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(`/edition/${editionId}`);
  };

  const handleConfrim = () => {
    navigate(`/edition/${editionId}`);
  };

  return (
    <>
      <p>AccessRightsPanel editionId: {editionId}</p>
      <button onClick={handleCancel}>cancel</button>
      <button onClick={handleConfrim}>confirm</button>
    </>
  );
};

export default AccessRightsPanel;
