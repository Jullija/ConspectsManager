import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/courses-list");
  };

  const handleConfrim = () => {
    navigate("/courses-list");
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
