import withPrivateZone from '../components/HOC/withLeftMenu/withPrivateZone';

/**
 * Constructs the location params (for 'history.push')
 * @param pathname {string}
 * @param search {string}
 * @returns {{search: string, pathname: string}}
 */
function getLocation(pathname, search) {
  return { pathname, search };
}

/**
 * Constructs route parameters
 * @param path {string}
 * @param component {React.Component}
 * @param exact {boolean=}
 * @param isPrivate {boolean=}
 * @param routes {Object[]=}
 * @param routes[].path {string}
 * @param routes[].component {React.Component}
 * @param routes[].exact {boolean=}
 * @return {{path: *, routes: Array, component: *, exact: boolean}}
 */
export function makeRoute(path, component, exact = false, isPrivate = false, routes = []) {
  return {
    path,
    component: isPrivate ? withPrivateZone(component) : component,
    exact,
    routes,
  };
}

/**
 *
 * @param allowedRoles {string[]}
 * @returns {typeof makeRoute}
 */
export function makeRoleRoute(allowedRoles = []) {
  if (!Array.isArray(allowedRoles) || !allowedRoles.length) return makeRoute;

  return function(path, component, exact = false, isPrivate = false, routes = []) {
    return {
      ...makeRoute(path, component, exact, isPrivate, routes),
      component: withPrivateZone(component, allowedRoles),
      allowedRoles,
    };
  };
}

const RouterUtils = {
  getLocation,
  makeRoute,
};

export default RouterUtils;
