import { useEffect } from 'react';

export const useDidMount = func => {
  useEffect(() => {
    func();
  }, [func]);
};

const Hooks = { useDidMount };

export default Hooks;
