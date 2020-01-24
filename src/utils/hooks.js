import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { parseSearch } from './history';

export const useDidMount = func => {
  useEffect(() => {
    func();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useSearchString = () => {
  const { search } = useLocation();
  return parseSearch(search);
};

const Hooks = { useDidMount, useSearchString };

export default Hooks;
