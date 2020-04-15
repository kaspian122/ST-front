import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import './WarningModal.scss';
import ModalActions from '../../../store/actions/modalActions';

function WarningModal(props) {
  const dispatch = useDispatch();

  function handleCloseClick() {
    props.onClose();
    dispatch(ModalActions.closeModal());
  }

  function handleOkClick() {
    props.onOk();
    dispatch(ModalActions.closeModal());
  }

  return (
    <div className="portal">
      <div className="portal-content">
        <span className="portal-content__header">{props.title}</span>
        <span className="portal-content__message">{props.text}</span>
        <div className="portal-content__actions">
          <div className="portal-content__actions-button" onClick={handleCloseClick}>
            {props.cancelTitle}
          </div>
          <div className="portal-content__actions-button" onClick={handleOkClick}>
            {props.acceptTitle}
          </div>
        </div>
      </div>
    </div>
  );
}

WarningModal.propTypes = {
  title: PropTypes.string,
  acceptTitle: PropTypes.string,
  text: PropTypes.string,
  cancelTitle: PropTypes.string,
  onClose: PropTypes.func,
  onOk: PropTypes.func,
};

WarningModal.defaultProps = {
  title: '',
  acceptTitle: 'Сохранить',
  text: '',
  cancelTitle: 'Отмена',
  onClose: () => {},
  onOk: () => {},
};

export default WarningModal;
