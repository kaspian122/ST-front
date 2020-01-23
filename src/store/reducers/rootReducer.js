import { combineReducers } from 'redux';
import appReducer from './appReducer';
import modalReducer from './modalReducer';
import disciplinesReducer from './disciplinesReducer';

const rootReducer = combineReducers({
  app: appReducer,
  modal: modalReducer,
  disciplines: disciplinesReducer,
});

export default rootReducer;
