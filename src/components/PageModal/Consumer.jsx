import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ModalTypes } from '../../constants/modalConstants';

function Consumer({ children }) {
  const type = useSelector(state => state.modal?.type);
  console.log('tip modalki', type);

  const modalComponent = useMemo(() => {
    switch (type) {
      case ModalTypes.ADD_THEME:
      case ModalTypes.EDIT_THEME:
        return 'oh shit maaan';
      default:
        return null;
    }
  }, [type]);
  return (
    <>
      {type && modalComponent}
      <div
        className="page"
        key="ORA_ORA_ORA_ORA_ORA_ORA_ORA_ORA_ORA_ORA"
        style={{ display: type && modalComponent ? 'none' : 'block' }}
      >
        {children}
      </div>
    </>
  );
}

export default Consumer;
