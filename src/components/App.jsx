import './App.scss';
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import withLeftMenu from './HOC/withLeftMenu/withLeftMenu';

function PrivateRoute(route) {
  return <Route exact={route.exact} path={route.path} component={withLeftMenu(route.component)} />;
}

function App(props) {
  console.log(props, props.routes);
  return (
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
