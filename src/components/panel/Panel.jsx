import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import CssUtils from '../../utils/sassUtils';

import './Panel.scss';

function Panel(props) {
  const [status, setStatus] = useState('');

  const baseClass = 'panel';
  const className = CssUtils.mergeModifiers(baseClass, {
    available: props.status === 'available',
    completed: props.status === 'completed',
    closed: props.status === 'closed',
  });

  useEffect(() => {
    setStatus(props.status);
  }, [setStatus, props.status]);

  let info;
  switch (status) {
    case 'available':
      info = (
        <div className={`${baseClass}__info`}>
          <div className={`${baseClass}__text--left`}>Доступен</div>
          <div className={`${baseClass}__text--right`}>до {props.date}</div>
        </div>
      );
      break;
    case 'completed':
      info = (
        <div className={`${baseClass}__info`}>
          <div className={`${baseClass}__text--left`}>Завершен</div>
          <div className={`${baseClass}__text--right`}>
            {!Number.isNaN(Number(props.score)) ? `Оценка ${props.score}` : `${props.score}`}
          </div>
        </div>
      );
      break;
    default:
      info = (
        <div className={`${baseClass}__info`}>
          <div className={`${baseClass}__text--left`}>Закрыт</div>
        </div>
      );
  }

  return (
    <div className={`badge ${className}`} onClick={props.onClick}>
      <div className={`${baseClass}__title`}>{props.title}</div>
      <div className={`${baseClass}__icon ${baseClass}__icon--${props.status}`}>{props.icon}</div>
      {info}
    </div>
  );
}

Panel.propTypes = {
  title: PropTypes.string,
  status: PropTypes.oneOf(['available', 'completed', 'closed']),
  score: PropTypes.string,
  date: PropTypes.string,
  icon: PropTypes.element,
  onClick: PropTypes.func,
};

Panel.defaultProps = {
  title: '',
  status: null,
  score: '',
  date: '',
  icon: null,
  onClick: () => {},
};

export default Panel;
