import './App.scss';
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

function App(props) {
  console.log(props, props.routes);
  return (
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
    </div>
  );
}

App.propTypes = {
  location: PropTypes.shape({}).isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      component: PropTypes.elementType,
      exact: PropTypes.bool,
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
