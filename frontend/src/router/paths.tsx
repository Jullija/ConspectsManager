const basePaths = {
  Default: '/',
  Login: '/login',
  SubjectsList: '/subjects-list',
  AddSubject: '/add-subject',
  Subject: '/subject',
  Edition: '/edition',
  AccessRights: '/access-rights-panel',
  AddEdition: '/add-edition',
  ErrorPage: '/error',
  PageNotFound: '*'
};

const subjectIdString = 'subjectId';
const editionIdString = 'editionId';
const errorMessageString = 'message';

// do not use outside routes.tsx
export const browserRouterPaths = {
  Default: basePaths.Default,
  Login: basePaths.Login,
  SubjectsList: basePaths.SubjectsList,
  AddSubject: basePaths.AddSubject,
  Subject: basePaths.Subject + '/:' + subjectIdString,
  Edition: basePaths.Edition + '/:' + subjectIdString + '/:' + editionIdString,
  AccessRights: basePaths.AccessRights + '/:' + subjectIdString + '/:' + editionIdString,
  AddEdition: basePaths.AddEdition + '/:' + subjectIdString,
  // TODO: make message optional
  ErrorPage: basePaths.ErrorPage + '/:' + errorMessageString,
  PageNotFound: basePaths.PageNotFound
};

export const pathGenerator = {
  Default: basePaths.Default,
  Login: basePaths.Login,
  SubjectsList: basePaths.SubjectsList,
  AddSubject: basePaths.AddSubject,
  subject: (subjectId: number) => {
    return basePaths.Subject + '/' + subjectId;
  },
  Edition: (subjectId: number, editionId: number) => {
    return basePaths.Edition + '/' + subjectId + '/' + editionId;
  },
  AccessRights: (subjectId: number, editionId: number) => {
    return basePaths.AccessRights + '/' + subjectId + '/' + editionId;
  },
  AddEdition: (subjectId: number) => {
    return basePaths.AddEdition + '/' + subjectId;
  },
  ErrorPage: (message: string) => {
    return basePaths.ErrorPage + '/' + message;
  },
  PageNotFound: basePaths.PageNotFound
};
