import { combineReducers } from 'redux';
import appReducer from './appReducer';
import modalReducer from './modalReducer';
import portalReducer from './portalReducer';
import disciplinesReducer from './disciplinesReducer';
import testsReducer from './testsReducer';

const rootReducer = combineReducers({
  app: appReducer,
  modal: modalReducer,
  portal: portalReducer,
  disciplines: disciplinesReducer,
  tests: testsReducer,
});

export default rootReducer;
