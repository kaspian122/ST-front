import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

function Discipline({ title, info, item, onClick }) {
  const handleClick = useCallback(() => {
    onClick(item);
  }, [item, onClick]);

  return (
    <div className="discipline" onClick={handleClick}>
      <div className="discipline__title">{title}</div>
      {info && <div className="discipline__info">{info}</div>}
    </div>
  );
}

Discipline.propTypes = {
  title: PropTypes.string,
  info: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node])),
  ]),
  item: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func,
};

Discipline.defaultProps = {
  title: '',
  info: '',
  onClick: () => {},
};

export default Discipline;
