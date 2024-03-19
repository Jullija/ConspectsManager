import { useEffect, useState } from "react";
import { Subject } from "../../utils/types";
import { Link, redirect } from "react-router-dom";
import { pathGenerator } from "../../router/paths";
import SubjectCard from "./SubjectCard";
import { getSubjects } from "../../api/subjects";
import CenteredMenu, { MenuItemType } from "./SubjectMenu";



const SubjectsList = () => {
  const [subjects, setSubjects] = useState<Subject[]>();

  useEffect(() => {
    setSubjects(getSubjects());
  }, []);

  const items: MenuItemType[] = [
    { key: 'subjectSort', name: 'Sortuj po przedmiocie' },
    { key: 'yearSort', name: 'Sortuj po roku' },
    { key: 'addSubject', name: 'Dodaj przedmiot' },
  ];
  
  
  

  return (
    <>

      <CenteredMenu items={items} />
      
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          justifyContent: "center",
          marginTop: 40,
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
