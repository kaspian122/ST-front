import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

import Menu from '../../menu';
import Api from '../../../services/api/api';

import { ReactComponent as ExitSVG } from '../../../static/images/svg/exit.svg';
import { ReactComponent as BackSVG } from '../../../static/images/svg/left-arrow.svg';
import { ReactComponent as LogoSVG } from '../../../static/images/svg/logo.svg';
import './withLeftMenu.scss';
import Consumer from '../../PageModal';
import ModalActions from '../../../store/actions/modalActions';
import { ModalTitles } from '../../../constants/modalConstants';
import Parent from '../../popup/closeDiscipline/closeDiscipline';
function withLeftMenu(Component) {
  return function Wrapper() {
    const [title, setTitle] = useState('Название страницы');
    const user = useSelector(state => state.app.user);
    const history = useHistory();
    const { pathname } = useLocation();
    const modal = useSelector(state => state.modal);
    const dispatch = useDispatch();

    useEffect(() => {}, []);

    const handleLogOut = useCallback(() => {
      Api.logout();
    }, []);

    function callModal() {
      console.log('ya tyyyyyyyta');
      return <Parent />;
    }

    const handleGoBack = () => {
      if (modal) {
        callModal();
        dispatch(ModalActions.closeModal());
      } else {
        callModal();
        history.goBack();
        console.log('ya tyta');
      }
    };
    return (
      <div className="logged-zone">
        <div className="logged-zone__menu">
          <div className="logged-zone__menu-top">
            <div className="logged-zone__logo">
              <LogoSVG />
              <span className="logged-zone__title">Система тестирования студентов</span>
            </div>
            <Menu />
          </div>

          <div className="logged-zone__menu-bottom">
            <div className="logged-zone__username">{user.fio}</div>
            <div className="logged-zone__logout" onClick={handleLogOut}>
              <ExitSVG />
            </div>
          </div>
        </div>
        <div className="logged-zone__content">
          <div className="logged-zone__content-wrapper">
            <div className="logged-zone__header">
              {!/^\/\w+$/g.test(pathname) && (
                <div className="logged-zone__header-back" onClick={handleGoBack}>
                  <BackSVG />
                </div>
              )}
              <div className="logged-zone__header-title">
                {modal ? ModalTitles[modal.type] : title}
              </div>
            </div>

            <Consumer>
              <Component setTitle={setTitle} />
            </Consumer>
          </div>
        </div>
      </div>
    );
  };
}

export default withLeftMenu;
