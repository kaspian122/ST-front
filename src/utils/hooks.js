import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { parseSearch } from './history';

export const useDidMount = func => {
  useEffect(() => {
    func();
  }, [func]);
};

export const useSearchString = () => {
  const { search } = useLocation();
  return parseSearch(search);
};

const Hooks = { useDidMount, useSearchString };

export default Hooks;
