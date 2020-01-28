import React, { useState, useCallback, useEffect } from 'react';

import PropTypes from 'prop-types';

import './MultipleForm.scss';
import Selector from './Selector';

function MultipleForm({ value, onChange, renderForm }) {
  const [selectedForm, setSelectedForm] = useState(0);

  useEffect(() => {
    if (!value.length) setSelectedForm(null);
  }, [value]);

  const handleAddForm = useCallback(() => {
    setSelectedForm(value.length);
    onChange(prevState => [...prevState, {}]);
  }, [value, onChange]);

  const handleSelectForm = useCallback(index => {
    setSelectedForm(index);
  }, []);

  const handleDeleteForm = useCallback(
    index => {
      onChange(prevState => {
        const prevForms = [...prevState];
        prevForms.splice(index, 1);
        return prevForms;
      });
      if (index < selectedForm || index + 1 === value.length) {
        setSelectedForm(prevState => prevState - 1);
      }
    },
    [value.length, onChange, setSelectedForm, selectedForm]
  );

  const handleFormChange = useCallback(
    formValue => {
      onChange(prevState => {
        const prevForms = [...prevState];
        prevForms[selectedForm] = formValue;
        return prevForms;
      });
    },
    [onChange, selectedForm]
  );

  return (
    <div className="multiple-form">
      <Selector
        items={value}
        onAdd={handleAddForm}
        onDelete={handleDeleteForm}
        onSelect={handleSelectForm}
        selected={selectedForm}
      />
      {renderForm({ form: value[selectedForm], onChange: handleFormChange })}
    </div>
  );
}

MultipleForm.propTypes = {
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  renderForm: PropTypes.elementType.isRequired,
};

MultipleForm.defaultProps = {
  onChange: () => {},
};

export default MultipleForm;
