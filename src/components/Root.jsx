import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from '../utils/history';
import Routes from '../services/routeConfig';
import App from './App';
import configureStore from '../store/configureStore';

export const store = configureStore();
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
