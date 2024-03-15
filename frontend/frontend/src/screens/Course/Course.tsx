import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Edition } from "../../types/types";
import { getEditions } from "../../api/editions";
import EditionCard from "./EditionCard";

const Course = () => {
  const params = useParams();
  const id = Number(params.id);

  const [editions, setEditions] = useState<Edition[]>();

  useEffect(() => {
    setEditions(getEditions(id));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <p>Course id: {id} </p>
      <Link to={"/add-edition"}>
        <button>add edition</button>
      </Link>
      {editions?.map((edition) => (
        <EditionCard edition={edition} />
      ))}
    </div>
  );
};

export default Course;
