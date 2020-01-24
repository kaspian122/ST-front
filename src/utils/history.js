import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export const parseSearch = (search = '') =>
  search
    .slice(1)
    .split('&')
    .reduce((acc, item) => {
      const [key, value] = item.split('=');
      return { ...acc, [key]: value };
    }, {});

export default history;
