import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { loadState } from './localStorage';

/**
 * Configures the redux store
 * @returns {object}
 */
export default function configureStore() {
  return createStore(rootReducer, loadState(), composeWithDevTools(applyMiddleware(thunk)));
}
