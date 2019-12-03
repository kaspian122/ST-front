import { combineReducers } from 'redux';
import appReducer from './appReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  app: appReducer,
  modal: modalReducer,
});

export default rootReducer;
