import './App.scss';
import React, { useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { useDidMount } from '../utils/hooks';
import Api from '../services/api/api';
import AppActions from '../store/actions/appActions';
import RouterPaths, { freeRoutes } from '../constants/routerPaths';
import Modal from './Modal/Modal';

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
          {props.routes.map(route => (
            <Route
              key={route.path}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
        <Modal />
      </div>
    )
  );
}

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
