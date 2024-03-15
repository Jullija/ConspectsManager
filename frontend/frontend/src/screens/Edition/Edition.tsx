import { useParams } from "react-router-dom";

const Edition = () => {
  const { id } = useParams();

  return <p>Edition id: {id}</p>;
};

export default Edition;
