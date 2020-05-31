import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ModalTypes } from '../../constants/modalConstants';
import AddThemeModal from './AddThemeModal';
import TestPage from '../../pages/testPage';
import TestInfo from '../TestInfo';
import DisciplineCreateForm from '../forms/DisciplineForm/DisciplineCreateForm';

function Consumer({ children }) {
  const modal = useSelector(state => state.modal);
  const type = modal?.type;
  const modalComponent = useMemo(() => {
    switch (type) {
      case ModalTypes.ADD_THEME:
        return <AddThemeModal modal={modal} />;
      case ModalTypes.EDIT_THEME:
        return <AddThemeModal modal={modal} isEdit />;
      case ModalTypes.ADD_TEST:
        return <TestPage />;
      case ModalTypes.CHECK_TEST:
        return <TestInfo />;
      case ModalTypes.EDIT_DISCIPLINE:
        return <DisciplineCreateForm isEdit />;
      default:
        return null;
    }
  }, [modal, type]);
  return (
    <>
      {!!type && modalComponent}
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
