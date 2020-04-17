import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import PortalActions from '../../../../store/actions/portalsAction';
import AppActions from '../../../../store/actions/appActions';
import Api from '../../../../services/api/api';

import './PortalView.scss';

function PortalView(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const form = useSelector(state => state.app.currentDiscipline);

  function handleClose() {
    dispatch(PortalActions.cancelPortal());
  }

  function handleOk() {
    if (form !== null) {
      Api.createDiscipline(form);
      dispatch(AppActions.setDiscipline(null));
      console.log('ya dobavil');
    }
    dispatch(PortalActions.cancelPortal());
    history.goBack();
  }

  return (
    <div className="portal">
      <div className="portal-content">
        <span className="portal-content__header">{props.title}</span>
        <span className="portal-content__message">{props.text}</span>
        <div className="portal-content__actions">
          <div className="portal-content__actions-button" onClick={handleClose}>
            отмена
          </div>
          <div className="portal-content__actions-button" onClick={handleOk}>
            {props.acept}
          </div>
        </div>
      </div>
    </div>
  );
}

PortalView.propTypes = {
  title: PropTypes.string,
  acept: PropTypes.string,
  text: PropTypes.string,
};

PortalView.defaultProps = {
  title: '',
  acept: '',
  text: '',
};

export default PortalView;
