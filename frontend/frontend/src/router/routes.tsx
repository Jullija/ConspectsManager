import { createBrowserRouter } from "react-router-dom";

import Login from "../screens/Login/Login";
import CoursesList from "../screens/CoursesList/CoursesList";
import Course from "../screens/Course/Course";
import AccessRightsPanel from "../screens/AccessRightsPanel/AccessRightsPanel";
import Edition from "../screens/Edition/Edition";
import AddEdition from "../screens/AddEdition/AddEdition";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
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
    path: "/course/:id",
    element: <Course />,
  },
  {
    path: "/edition/:id",
    element: <Edition />,
  },
  {
    path: "/access-rights-panel/:id",
    element: <AccessRightsPanel />,
  },
  {
    path: "/add-edition",
    element: <AddEdition />,
  },
]);

export default routes;
