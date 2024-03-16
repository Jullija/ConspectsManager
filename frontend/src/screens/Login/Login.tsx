import { useNavigate } from "react-router-dom";
import { pathGenerator } from "../../router/paths";

const Login = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(pathGenerator.CoursesList);
  };
  return (
    <>
      <p>Login</p>
      <button onClick={handleClick}>login</button>
    </>
  );
};

export default Login;
