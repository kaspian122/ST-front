import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import {
  PortalText,
  PortalTypes,
  PortalTitles,
  PortalAcept,
} from '../../constants/portalConstants';
import PortalActions from '../../store/actions/portalsAction';

import './Modal.scss';

function Modal() {
  const dispatch = useDispatch();

  function handleClick() {
    console.log('hui');
    dispatch(PortalActions.closePortal);
  }

  console.log('ya portal nowaya portal');
  /* <div className="modal">
      <div className="modal-content">
        <span className="modal-content__header">{PortalTitles[PortalTypes.CLOSE_INCORRECT_DISCIPLINE]}</span>
        <span className="modal-content__message">
          {PortalText[PortalTypes.CLOSE_INCORRECT_DISCIPLINE]}
        </span>
        <div className="modal-content__actions">
          <div className="modal-content__actions-button">отмена</div>
          <div className="modal-content__actions-button" onClick={handleClick}>{PortalAcept[PortalTypes.CLOSE_INCORRECT_DISCIPLINE]}</div>

        </div>
      </div>
    </div>

    вот тут что надо делать:
    во-1, нужно рисовать если не нулл в сторе лежит
    во-2, нужно диспачить резет на закрытие
    в-3, нужно подумать, как рисовать по условию - так как мы  через константы или просто прокидывать ребенка, хммммммммм

    */

  return ReactDOM.createPortal(<div>hui</div>, document.getElementById('modal-root'));
}
export default Modal;
