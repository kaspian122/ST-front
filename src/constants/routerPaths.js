const RouterPaths = {
  mainPage: '/',
  languageSelectPage: '/language-select',
  disciplines: '/disciplines',
  newDiscipline: '/disciplines/new',
  discipline: '/disciplines/:id',
  tests: '/tests',
  loginPage: '/login',
  registration: '/registration',
  errorPage: '/error',
  fakePage: '/fake',
  makeHera: 'hera',
  testPage: '/test/:id',
  testSolution: '/test-solution/:id',
  studentDiscipline: '/studentDisciplines/:id',
};

export const freeRoutes = [RouterPaths.mainPage, RouterPaths.registration, RouterPaths.loginPage];

export default RouterPaths;
