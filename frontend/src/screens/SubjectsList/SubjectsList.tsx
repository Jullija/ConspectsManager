import { useEffect, useState } from "react";
import { Subject } from "../../types/types";
import { Link } from "react-router-dom";
import { pathGenerator } from "../../router/paths";
import SubjectCard from "./SubjectCard";
import { getSubjects } from "../../api/subjects";

const SubjectsList = () => {
  const [subjects, setSubjects] = useState<Subject[]>();

  useEffect(() => {
    setSubjects(getSubjects());
  }, []);

  return (
    <>
      <p>subjectList</p>
      <Link to={pathGenerator.AddSubject}>
        <button>add subject</button>
      </Link>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        {subjects?.map((subject, index) => {
          return <SubjectCard subject={subject} key={index} />;
        })}
      </div>
    </>
  );
};

export default SubjectsList;
