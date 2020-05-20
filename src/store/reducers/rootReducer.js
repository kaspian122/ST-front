import { combineReducers } from 'redux';
import appReducer from './appReducer';
import modalReducer from './modalReducer';
import disciplinesReducer from './disciplinesReducer';
import testsReducer from './testsReducer';
import portalReducer from './portalReducer';

const rootReducer = combineReducers({
  app: appReducer,
  modal: modalReducer,
  portal: portalReducer,
  disciplines: disciplinesReducer,
  tests: testsReducer,
});

export default rootReducer;
