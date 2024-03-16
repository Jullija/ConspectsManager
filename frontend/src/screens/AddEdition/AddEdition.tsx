import { useNavigate, useParams } from "react-router-dom";
import { pathGenerator } from "../../router/paths";

const AddEdition = () => {
  const params = useParams();
  const courseId = Number(params.courseId);

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(pathGenerator.Course(courseId));
  };

  const handleConfrim = () => {
    navigate(pathGenerator.Course(courseId));
  };

  return (
    <>
      <p>AddEdition id: {courseId}</p>
      <button onClick={handleCancel}>cancel</button>
      <button onClick={handleConfrim}>confirm</button>
    </>
  );
};

export default AddEdition;
