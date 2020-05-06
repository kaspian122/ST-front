import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { ModalTypes } from '../../constants/modalConstants';
import WarningModal from '../modalComponents/WarningModal';

function Modal() {
  const modal = useSelector(state => state.portal);
  const type = modal?.type;
  const modalProps = modal?.props;

  const getModalComponent = () => {
    switch (type) {
      case ModalTypes.WARNING:
        return <WarningModal {...modalProps} />;
      default:
        return null;
    }
  };

  return (
    getModalComponent() &&
    ReactDOM.createPortal(
      <div className="modal">
        <div className="modal__wrapper">
          <div className="modal__content">{getModalComponent()}</div>
        </div>
      </div>,
      document.getElementById('modal-root')
    )
  );
}
export default React.memo(Modal);
