import { useEffect, useState } from "react";
import { Course } from "../../types/types";
import { getCourses } from "../../api/courses";
import CourseCard from "./CourseCard";
import { Link } from "react-router-dom";

const CoursesList = () => {
  const [courses, setCourses] = useState<Course[]>();

  useEffect(() => {
    setCourses(getCourses());
  }, []);

  return (
    <>
      <Link to="/add-course">
        <button>add course</button>
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
        {courses?.map((course, index) => {
          return <CourseCard course={course} key={index} />;
        })}
      </div>
    </>
  );
};

export default CoursesList;
