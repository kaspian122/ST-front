import './Button.scss';
import React from 'react';
import PropTypes from 'prop-types';
import CssUtils from '../../utils/sassUtils';

function Button(props) {
  const baseClass = 'button';
  const className = CssUtils.mergeModifiers([baseClass, props.parentBlock], {
    wide: props.wide,
    white: props.color === 'white',
    'blue-light': props.color === 'blue-light',
    navigation: props.navigation,
    icon: props.icon,
    secondary: props.secondary,
  });

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={className}
      disabled={props.disabled}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children || props.label}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(['white', 'blue-light']),
  disabled: PropTypes.bool,
  icon: PropTypes.bool,
  secondary: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
  parentBlock: PropTypes.string,
  type: PropTypes.oneOf(['submit', 'button', 'reset']),
  wide: PropTypes.bool,
  navigation: PropTypes.bool,
};

Button.defaultProps = {
  children: null,
  color: null,
  disabled: false,
  icon: false,
  secondary: false,
  label: ' ',
  onClick: () => {},
  parentBlock: null,
  type: 'button',
  wide: false,
  navigation: false,
};

export default Button;
