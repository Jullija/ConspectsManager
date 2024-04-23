import { useParams } from 'react-router-dom';

const ErrorPage = () => {
  const params = useParams();
  const message = params.message;

  return (
    <>
      <h1>Error</h1>
      <p>{message ? message : 'coś poszło nie tak :('}</p>
    </>
  );
};

export default ErrorPage;
