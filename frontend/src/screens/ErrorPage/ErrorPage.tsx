import { useParams } from 'react-router-dom';

const ErrorPage = () => {
  const params = useParams();
  const message = params.message;

  return (
    <>
      <h1>Error</h1>
      <p>{message ? message : 'something went wrong :('}</p>
    </>
  );
};

export default ErrorPage;
