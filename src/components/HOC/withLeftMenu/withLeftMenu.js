import React, { useCallback, useState } from 'react';

import { ReactComponent as ExitSVG } from '../../../static/images/svg/exit.svg';
import { ReactComponent as LogoSVG } from '../../../static/images/svg/logo.svg';
import './withLeftMenu.scss';
import Menu from '../../menu';
import Api from '../../../services/api/api';
import { useSelector } from 'react-redux';

function withLeftMenu(Component) {
  return function Wrapper() {
    const handleLogOut = useCallback(() => {
      Api.logout();
    }, []);
    const [title, setTitle] = useState('Название страницы');
    const user = useSelector(state => state.app.user);
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
            <div
              className="logged-zone__logout"
              role="button"
              onKeyPress={() => {}}
              tabIndex={-999}
              onClick={handleLogOut}
            >
              <ExitSVG />
            </div>
          </div>
        </div>
        <div className="logged-zone__content">
          <div className="logged-zone__header">
            <div className="logged-zone__header-back" />
            <div className="logged-zone__header-title">{title}</div>
          </div>
          <Component setTitle={setTitle} />
        </div>
      </div>
    );
  };
}

export default withLeftMenu;
