import { combineReducers } from 'redux';
import appReducer from './appReducer';
import modalReducer from './modalReducer';
import disciplinesReducer from './disciplinesReducer';
import testsReducer from './testsReducer';

const rootReducer = combineReducers({
  app: appReducer,
  modal: modalReducer,
  disciplines: disciplinesReducer,
  tests: testsReducer,
});

export default rootReducer;
