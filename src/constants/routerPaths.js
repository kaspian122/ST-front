const RouterPaths = {
  mainPage: '/',
  languageSelectPage: '/language-select',
  disciplines: '/disciplines',
  discipline: '/disciplines/:id',
  tests: '/tests',
  loginPage: '/login',
  registration: '/registration',
  errorPage: '',
  fakePage: '/fake',
  makeHera: 'hera',
  testPage: '/test/:id',
  testSolution: '/test-solution/:id',
};

export const freeRoutes = [RouterPaths.mainPage, RouterPaths.registration, RouterPaths.loginPage];

export default RouterPaths;
