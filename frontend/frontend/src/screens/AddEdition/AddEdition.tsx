import { useNavigate, useParams } from "react-router-dom";

const AddEdition = () => {
  const params = useParams();
  const courseId = Number(params.id);

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(`/course/${courseId}`);
  };

  const handleConfrim = () => {
    navigate(`/course/${courseId}`);
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
