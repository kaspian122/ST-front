import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as AddSVG } from '../../static/images/svg/add.svg';
import { ReactReduxContext } from 'react-redux';

function NewBadge({ text, onClick }) {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);
  return (
    <>
      {!onClick && (
        <div className="badge badge--new" onClick={handleClick}>
          <AddSVG />
          <span className="badge__text">{text}</span>
        </div>
      )}
    </>
  );
}

NewBadge.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

NewBadge.defaultProps = {
  onClick: undefined,
};

export default NewBadge;
