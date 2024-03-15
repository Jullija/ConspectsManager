import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/courses-list");
  };
  return (
    <>
      <p>Login</p>
      <button onClick={handleClick}>login</button>
    </>
  );
};

export default Login;
