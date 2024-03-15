import { Link, useParams } from "react-router-dom";

const Edition = () => {
  const params = useParams();
  const id = Number(params.id);

  return (
    <>
      <p>Edition editionId: {id}</p>
      <Link to={`/access-rights-panel/${id}`}>
        <button>access rights</button>
      </Link>
    </>
  );
};

export default Edition;
