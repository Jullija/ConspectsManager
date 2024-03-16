import { useNavigate } from "react-router-dom";
import { pathGenerator } from "../../router/paths";

const AddCourse = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(pathGenerator.CoursesList);
  };

  const handleConfrim = () => {
    navigate(pathGenerator.CoursesList);
  };

  return (
    <>
      <p>AddCourse</p>
      <button onClick={handleCancel}>cancel</button>
      <button onClick={handleConfrim}>confirm</button>
    </>
  );
};

export default AddCourse;
