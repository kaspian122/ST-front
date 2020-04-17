import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import './Discipline.scss';

function NewDiscipline({ text, onClick }) {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);
  return (
    <>
      {onClick && (
        <div className="discipline--new" onClick={handleClick}>
          <span className="discipline__text">{text}</span>
        </div>
      )}
    </>
  );
}

NewDiscipline.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

NewDiscipline.defaultProps = {
  onClick: undefined,
};

export default NewDiscipline;
