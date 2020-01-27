import React, { useState, useCallback, useEffect } from 'react';

import './MultipleForm.scss';
import Selector from './Selector';

function MultipleForm({ renderForm }) {
  const [forms, setForms] = useState([{}]);
  const [selectedForm, setSelectedForm] = useState(0);

  useEffect(() => {
    if (!forms.length) setSelectedForm(null);
  }, [forms]);

  const handleAddForm = useCallback(() => {
    setSelectedForm(forms.length);
    setForms(prevState => [...prevState, {}]);
  }, [forms]);

  const handleSelectForm = useCallback(index => {
    setSelectedForm(index);
  }, []);

  const handleDeleteForm = useCallback(
    index => {
      setForms(prevState => {
        const prevForms = [...prevState];
        prevForms.splice(index, 1);
        return prevForms;
      });
      if (index < selectedForm) {
        setSelectedForm(prevState => prevState - 1);
      }
    },
    [setForms, setSelectedForm, selectedForm]
  );

  const handleFormChange = useCallback(
    formValue => {
      setForms(prevState => {
        const prevForms = [...prevState];
        prevForms[selectedForm] = formValue;
        return prevForms;
      });
    },
    [setForms, selectedForm]
  );

  return (
    <div className="multiple-form">
      <Selector
        items={forms}
        onAdd={handleAddForm}
        onDelete={handleDeleteForm}
        onSelect={handleSelectForm}
        selected={selectedForm}
      />
      {renderForm({ form: forms[selectedForm], onChange: handleFormChange })}
    </div>
  );
}

export default MultipleForm;
