import { useNavigate, useParams } from "react-router-dom";
import { pathGenerator } from "../../router/paths";

const AddEdition = () => {
  const params = useParams();
  const subjectId = Number(params.subjectId);

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(pathGenerator.subject(subjectId));
  };

  const handleConfrim = () => {
    navigate(pathGenerator.subject(subjectId));
  };

  return (
    <>
      <p>AddEdition id: {subjectId}</p>
      <button onClick={handleCancel}>cancel</button>
      <button onClick={handleConfrim}>confirm</button>
    </>
  );
};

export default AddEdition;
