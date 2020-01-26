import http from './apiConfig';
import history from '../../utils/history';
import RouterPaths from '../../constants/routerPaths';
import AppActions from '../../store/actions/appActions';

/**
 * @param body {Object}
 * @param body.operator_id {string}
 * @param body.id {string}
 * @returns {Promise<AxiosResponse<T>>}
 */

// const initConnection = body => http.post('tnl/init/connection', body);

const authMe = () => http.get('auth/me/');
/**
 *
 * @param login {String}
 * @param password {String}
 * @returns {Promise<AxiosResponse<T>>}
 */
const auth = (login, password) =>
  http.post('auth/token/', { login, password }).then(response => {
    sessionStorage.setItem('refresh', response.refresh);
    sessionStorage.setItem('token', `Bearer ${response.access}`);
    return response;
  });

const logout = () =>
  new Promise((resolve, reject) => {
    try {
      sessionStorage.removeItem('refresh');
      sessionStorage.removeItem('token');
      history.push(RouterPaths.loginPage);
      resolve();
    } catch (e) {
      reject(e);
    }
  });

const getDisciplines = () => http.get('teacher/disciplines');

const getGroups = () => http.get('teacher/group-list/');

const getThemes = discipline => http.get(`teacher/themes/${discipline}/`);

const Api = { authMe, auth, logout, getDisciplines, getThemes, getGroups };

export default Api;
