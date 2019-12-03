import axios from 'axios';

const apiPath = 'api';
const apiVersion = '/v1';

const stands = [];

const standUrl = process.env.NODE_ENV !== 'production' ? stands[0] : stands[0];

const http = axios.create({
  baseURL: standUrl + apiPath + apiVersion,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

http.interceptors.request.use(
  config => config,
  error => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject(error);
  }
);

export default http;
