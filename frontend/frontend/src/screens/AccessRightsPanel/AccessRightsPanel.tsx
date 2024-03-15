import { useParams } from "react-router-dom";

const AccessRightsPanel = () => {
  const { id } = useParams();

  return <p>AccessRightsPanel id: {id}</p>;
};

export default AccessRightsPanel;
