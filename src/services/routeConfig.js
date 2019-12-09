import { makeRoute } from '../utils/routerUtils';
import RouterPaths from '../constants/routerPaths';
import FakePage from '../pages/_fakePage';
import LoginPage from '../pages/loginPage';
import RegistrationPage from '../pages/registrationPage';

const Routes = [
  makeRoute(RouterPaths.mainPage, FakePage, true),
  makeRoute(RouterPaths.loginPage, LoginPage),
  makeRoute(RouterPaths.registration, RegistrationPage),
];

export default Routes;
