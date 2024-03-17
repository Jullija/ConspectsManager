const basePaths = {
  Default: "/",
  Login: "/login",
  CoursesList: "/courses-list",
  AddCourse: "/add-course",
  Course: "/course",
  Edition: "/edition",
  AccessRights: "/access-rights-panel",
  AddEdition: "/add-edition",
  PageNotFound: "*",
};

const courseIdString = "courseId";
const editionIdString = "editionId";

// do not use outside routes.tsx
export const browserRouterPaths = {
  Default: basePaths.Default,
  Login: basePaths.Login,
  CoursesList: basePaths.CoursesList,
  AddCourse: basePaths.AddCourse,
  Course: basePaths.Course + "/:" + courseIdString,
  Edition: basePaths.Edition + "/:" + courseIdString + "/:" + editionIdString,
  AccessRights:
    basePaths.AccessRights + "/:" + courseIdString + "/:" + editionIdString,
  AddEdition: basePaths.AddEdition + "/:" + courseIdString,
  PageNotFound: basePaths.PageNotFound,
};

export const pathGenerator = {
  Default: basePaths.Default,
  Login: basePaths.Login,
  CoursesList: basePaths.CoursesList,
  AddCourse: basePaths.AddCourse,
  Course: (courseId: number) => {
    return basePaths.Course + "/" + courseId;
  },
  Edition: (courseId: number, editionId: number) => {
    return basePaths.Edition + "/" + courseId + "/" + editionId;
  },
  AccessRights: (courseId: number, editionId: number) => {
    return basePaths.AccessRights + "/" + courseId + "/" + editionId;
  },
  AddEdition: (courseId: number) => {
    return basePaths.AddEdition + "/" + courseId;
  },
  PageNotFound: basePaths.PageNotFound,
};
