import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import './Badge.scss';

function Badge({ title, info, item, onClick }) {
  const handleClick = useCallback(() => {
    onClick(item);
  }, [item, onClick]);

  return (
    <div className="badge" onClick={handleClick}>
      <div className="badge__title">{title}</div>
      {info && <div className="badge__info">{info}</div>}
    </div>
  );
}

Badge.propTypes = {
  title: PropTypes.string,
  info: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node])),
  ]),
  item: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func,
};

Badge.defaultProps = {
  title: '',
  info: '',
  onClick: () => {},
};

export default Badge;
