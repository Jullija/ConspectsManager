import { useNavigate } from "react-router-dom";
import { pathGenerator } from "../../router/paths";

const AddSubject = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(pathGenerator.SubjectsList);
  };

  const handleConfrim = () => {
    navigate(pathGenerator.SubjectsList);
  };

  return (
    <>
      <p>AddSubject</p>
      <button onClick={handleCancel}>cancel</button>
      <button onClick={handleConfrim}>confirm</button>
    </>
  );
};

export default AddSubject;
