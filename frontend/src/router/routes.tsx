import { createBrowserRouter } from "react-router-dom";

import Login from "../screens/Login/Login";
import CoursesList from "../screens/CoursesList/CoursesList";
import Course from "../screens/Course/Course";
import AccessRightsPanel from "../screens/AccessRightsPanel/AccessRightsPanel";
import Edition from "../screens/Edition/Edition";
import AddEdition from "../screens/AddEdition/AddEdition";
import AddCourse from "../screens/AddCourse/AddCourse";
import Root from "../components/Root";
import PageNotFound from "../screens/PageNotFound/PageNotFound";
import { browserRouterPaths } from "./paths";

const routes = createBrowserRouter([
  {
    path: browserRouterPaths.Default,
    element: <Root />,
    children: [
      {
        path: browserRouterPaths.Default,
        element: <Login />,
        index: true,
      },
      {
        path: browserRouterPaths.Login,
        element: <Login />,
      },
      {
        path: browserRouterPaths.CoursesList,
        element: <CoursesList />,
      },
      {
        path: browserRouterPaths.AddCourse,
        element: <AddCourse />,
      },
      {
        path: browserRouterPaths.Course,
        element: <Course />,
      },
      {
        path: browserRouterPaths.Edition,
        element: <Edition />,
      },
      {
        path: browserRouterPaths.AccessRights,
        element: <AccessRightsPanel />,
      },
      {
        path: browserRouterPaths.AddEdition,
        element: <AddEdition />,
      },
      {
        path: browserRouterPaths.PageNotFound,
        element: <PageNotFound />,
      },
    ],
  },
]);

export default routes;
