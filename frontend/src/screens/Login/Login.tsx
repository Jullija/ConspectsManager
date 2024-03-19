import { useNavigate } from 'react-router-dom';
import { pathGenerator } from '../../router/paths';

const Login = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(pathGenerator.SubjectsList);
  };
  return (
    <>
      <p>Login</p>
      <button onClick={handleClick}>login</button>
    </>
  );
};

export default Login;
