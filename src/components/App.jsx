import './App.scss';
import React, { useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

import withLeftMenu from './HOC/withLeftMenu/withLeftMenu';
import { useDidMount } from '../utils/hooks';
import Api from '../services/api/api';
import AppActions from '../store/actions/appActions';
import RouterPaths, { freeRoutes } from '../constants/routerPaths';

function PrivateRoute(route) {
  return (
    <Route
      key={route.path}
      exact={route.exact}
      path={route.path}
      component={withLeftMenu(route.component)}
    />
  );
}

function App(props) {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  useDidMount(() => {
    Api.authMe()
      .then(user => {
        dispatch(AppActions.setUser(user));
        if (freeRoutes.includes(pathname)) history.push(RouterPaths.disciplines);
      })
      .finally(() => {
        setChecked(true);
      });
  });
  return (
    checked && (
      <div className="app-container">
        <Switch location={props.location}>
          {props.routes.map(route =>
            route.isPrivate ? (
              PrivateRoute(route)
            ) : (
              <Route
                key={route.path}
                exact={route.exact}
                path={route.path}
                component={route.component}
              />
            )
          )}
        </Switch>
      </div>
    )
  );
}

PrivateRoute.propTypes = {
  route: PropTypes.shape({
    path: PropTypes.string,
    component: PropTypes.elementType,
    exact: PropTypes.bool,
    isPrivate: PropTypes.bool,
  }).isRequired,
};

App.propTypes = {
  location: PropTypes.shape({}).isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      component: PropTypes.elementType,
      exact: PropTypes.bool,
      isPrivate: PropTypes.bool,
      routes: PropTypes.arrayOf(
        PropTypes.shape({
          path: PropTypes.string,
          component: PropTypes.elementType,
          exact: PropTypes.bool,
        })
      ),
    })
  ).isRequired,
};

export default withRouter(App);
