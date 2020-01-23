/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CssUtils from '../../utils/sassUtils';

import './Field.scss';

function Field(props) {
  const { error } = props;

  const [isDirt, setIsDirt] = useState(Boolean(props.value));
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = event => props.onChange(event);

  const handleInputFocus = event => {
    setIsDirt(true);
    setIsFocused(true);
    props.onFocus(event);
  };

  const handleInputBlur = event => {
    setIsDirt(Boolean(props.value));
    setIsFocused(false);
    props.onBlur(event);
  };

  return (
    <div className={CssUtils.mergeModifiers('field', { dirt: isDirt, focus: isFocused })}>
      <label htmlFor={props.name} className="field__label">
        {props.label}
      </label>

      <input
        className={CssUtils.mergeModifiers('field__input', { error })}
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        autoComplete={props.autoComplete}
        readOnly={props.readonly}
        placeholder={props.placeholder}
      />
      {error && <span className="field__error">{error}</span>}
    </div>
  );
}

Field.propTypes = {
  readonly: PropTypes.bool,
  autoComplete: PropTypes.oneOf(['off', 'on']),
  error: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

Field.defaultProps = {
  readonly: false,
  type: 'text',
  autoComplete: 'off',
  error: null,
  label: '',
  placeholder: '',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
};

export default Field;
