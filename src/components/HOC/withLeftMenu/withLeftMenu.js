import React from 'react';

import { ReactComponent as ExitSVG } from '../../../static/images/svg/exit.svg';
import { ReactComponent as LogoSVG } from '../../../static/images/svg/logo.svg';
import './withLeftMenu.scss';
import Menu from '../../menu';

function withLeftMenu(component) {
  return function wrapper() {
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
            <div className="logged-zone__username">ГЛЫКОВ ПЕРС ИОАНОВИЧ</div>
            <div className="logged-zone__logout">
              <ExitSVG />
            </div>
          </div>
        </div>
        <div className="logged-zone__content">{component()}</div>
      </div>
    );
  };
}

export default withLeftMenu;
