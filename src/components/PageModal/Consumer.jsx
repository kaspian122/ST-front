import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ModalTypes } from '../../constants/modalConstants';
import AddThemeModal from './AddThemeModal';
import TestPage from '../../pages/testPage';

function Consumer({ children }) {
  const type = useSelector(state => state.modal?.type);

  const modalComponent = useMemo(() => {
    switch (type) {
      case ModalTypes.ADD_THEME:
      case ModalTypes.EDIT_THEME:
        return <AddThemeModal />;
      case ModalTypes.ADD_TEST:
        return <TestPage />;
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

Consumer.propTypes = {
  children: PropTypes.node,
};
Consumer.defaultProps = {
  children: <></>,
};

export default Consumer;
