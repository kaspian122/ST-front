import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { Input } from 'antd';
import MultipleForm from '../multipleForm';
import { QuestionEditForm } from '../forms';

import './AddThemeModal.scss';
import Button from '../button';
import RouterPaths from '../../constants/routerPaths';
import Api from '../../services/api/api';

function AddThemeModal() {
  const [form, setForm] = useState({ name: '', questions: [{}] });
  const { id: discipline } = useParams(RouterPaths.discipline);
  const handleChange = useCallback(
    fieldName => e => {
      let value = e;
      if (e?.target?.value) {
        value = e.target?.value;
      }
      setForm(prevState => ({ ...prevState, [fieldName]: value }));
    },
    [setForm]
  );

  // func = prevState=>newState
  const handleQuestionsChange = useCallback(
    func => {
      handleChange('questions')(func(form.questions));
    },
    [form, handleChange]
  );

  const handleSubmitForm = useCallback(() => {
    Api.sendTheme({ ...form, discipline });
  }, [form, discipline]);

  // console.log(form)
  return (
    <div className="add-theme">
      <div className="add-theme__title">
        <div className="add-theme__title-label">Название темы</div>
        <Input className="add-theme__title-input" onChange={handleChange('name')} />
      </div>
      <MultipleForm
        value={form.questions}
        onChange={handleQuestionsChange}
        renderForm={QuestionEditForm}
      />

      <Button onClick={handleSubmitForm}>Сохранить</Button>
    </div>
  );
}

export default AddThemeModal;
