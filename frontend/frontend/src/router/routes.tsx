import { createBrowserRouter } from "react-router-dom";

import Login from "../screens/Login/Login";
import CoursesList from "../screens/CoursesList/CoursesList";
import Course from "../screens/Course/Course";
import AccessRightsPanel from "../screens/AccessRightsPanel/AccessRightsPanel";
import Edition from "../screens/Edition/Edition";
import AddEdition from "../screens/AddEdition/AddEdition";
import AddCourse from "../screens/AddCourse/AddCourse";
import Root from "../components/Root";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Login />,
        index: true,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/courses-list",
        element: <CoursesList />,
      },
      {
        path: "/add-course",
        element: <AddCourse />,
      },
      {
        path: "/course/:courseId",
        element: <Course />,
      },
      {
        path: "/edition/:courseId/:editionId",
        element: <Edition />,
      },
      {
        path: "/access-rights-panel/:courseId/:editionId",
        element: <AccessRightsPanel />,
      },
      {
        path: "/add-edition/:courseId",
        element: <AddEdition />,
      },
    ],
  },
]);

export default routes;
