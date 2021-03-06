import axios from 'axios';

import history from '../../utils/history';
import RouterPaths from '../../constants/routerPaths';

const apiPath = 'api';
// const apiVersion = '/v1';

const stands = ['http://2.59.41.80:8000/'];

const standUrl = process.env.NODE_ENV !== 'production' ? stands[0] : stands[0];

const http = axios.create({
  baseURL: standUrl + apiPath,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use(
  config => ({ ...config, headers: { Authorization: sessionStorage.getItem('token') } }),
  error => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  response => response.data,
  error => {
    const status = error?.response?.status;
    if (status === 401) {
      sessionStorage.removeItem('refresh');
      sessionStorage.removeItem('token');
      if (history.pathname !== RouterPaths.loginPage) history.replace(RouterPaths.loginPage);
    }
    if (status === 403) {
      if (history.pathname !== RouterPaths.disciplines) history.replace(RouterPaths.disciplines);
      // если не доступны дисципллины, то перейти на главную доступную страницу
      // else history.replace(RouterPaths.)
    }
    return Promise.reject(error);
  }
);

export default http;
