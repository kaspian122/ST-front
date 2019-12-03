import { makeRoute } from '../utils/routerUtils';
import RouterPaths from '../constants/routerPaths';
import FakePage from '../pages/_fakePage';
import LoginPage from '../pages/loginPage';

const Routes = [
  makeRoute(RouterPaths.mainPage, FakePage, true),
  makeRoute(RouterPaths.loginPage, LoginPage),
];

export default Routes;
