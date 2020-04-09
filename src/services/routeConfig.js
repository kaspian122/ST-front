import { makeRoute } from '../utils/routerUtils';
import RouterPaths from '../constants/routerPaths';
import LoginPage from '../pages/loginPage';
import RegistrationPage from '../pages/registrationPage';
import IndexPage from '../pages/indexPage';
import DisciplinesPage from '../pages/disciplinesPage';
import TestsPage from '../pages/testsPage';
import DisciplinePage from '../pages/disciplinePage';
import TestInfo from '../components/TestInfo';
import TestSolution from '../components/TestSolution';
import NewDiscipline from '../pages/newDiscipline/NewDiscipline';

const Routes = [
  makeRoute(RouterPaths.mainPage, IndexPage, true),
  makeRoute(RouterPaths.loginPage, LoginPage),
  makeRoute(RouterPaths.disciplines, DisciplinesPage, true, true),
  makeRoute(RouterPaths.newdiscipline, NewDiscipline, false, true),
  makeRoute(RouterPaths.discipline, DisciplinePage, false, true),
  makeRoute(RouterPaths.tests, TestsPage, false, true),
  makeRoute(RouterPaths.registration, RegistrationPage),
  makeRoute(RouterPaths.testPage, TestInfo, false, true),
  makeRoute(RouterPaths.testSolution, TestSolution, false, true),
];

export default Routes;
