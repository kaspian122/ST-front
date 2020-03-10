import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { ReactComponent as DisciplinesSVG } from '../../static/images/svg/disciplines.svg';
import { ReactComponent as TestsSVG } from '../../static/images/svg/tests.svg';
import CssUtils from '../../utils/sassUtils';
import RouterPaths from '../../constants/routerPaths';
import ModalActions from '../../store/actions/modalActions';

const menuItems = [
  {
    text: 'Дисциплины',
    to: RouterPaths.disciplines,
    logo: DisciplinesSVG,
  },
  {
    text: 'тесты',
    to: RouterPaths.tests,
    logo: TestsSVG,
  },
];

/**
 *  component without his own styles
 * @returns {*}
 * @constructor
 */
function Menu() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  return (
    <div className="menu">
      {menuItems.map(item => (
        <Link key={item.to} to={item.to} onClick={() => dispatch(ModalActions.closeModal())}>
          <div className={CssUtils.mergeModifiers('menu__item', { active: pathname === item.to })}>
            {item.logo && <item.logo className="menu__item-logo" />}
            <span className="menu__item-text">{item.text}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Menu;
