import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { throttle } from 'lodash';

import history from '../utils/history';
import Routes from '../services/routeConfig';
import App from './App';
import configureStore from '../store/configureStore';
import { saveState } from '../store/localStorage';

export const store = configureStore();

store.subscribe(
  throttle(() => {
    saveState({ ...store.getState() });
  })
);

function Root() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <App routes={Routes} />
      </Router>
    </Provider>
  );
}

export default Root;
