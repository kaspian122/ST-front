import http from './apiConfig';

/**
 * @param body {Object}
 * @param body.operator_id {string}
 * @param body.id {string}
 * @returns {Promise<AxiosResponse<T>>}
 */

// const initConnection = body => http.post('tnl/init/connection', body);
/**
 *
 * @param login {String}
 * @param password {String}
 * @returns {Promise<AxiosResponse<T>>}
 */
const auth = (login, password) => http.post('auth/token/', { login, password });

const Api = { auth };

export default Api;
