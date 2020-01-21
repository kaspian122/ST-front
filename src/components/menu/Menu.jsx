import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as DisciplinesSVG } from '../../static/images/svg/disciplines.svg';
import { ReactComponent as TestsSVG } from '../../static/images/svg/tests.svg';

const menuItems = [
  {
    text: 'Дисциплины',
    to: '/disciplines',
    logo: DisciplinesSVG,
  },
  {
    text: 'тесты',
    to: '/tests',
    logo: TestsSVG,
  },
];

/**
 *  component without his own styles
 * @returns {*}
 * @constructor
 */
function Menu() {
  return (
    <div className="menu">
      {menuItems.map(item => (
        <Link to={item.to}>
          <div className="menu__item">
            {item.logo && <item.logo className="menu__item-logo" />}
            <span className="menu__item-text">{item.text}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Menu;
