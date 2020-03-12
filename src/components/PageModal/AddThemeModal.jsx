import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { Input } from 'antd';
import MultipleForm from '../multipleForm';
import { QuestionEditForm } from '../forms';

import './AddThemeModal.scss';
import Button from '../button';
import RouterPaths from '../../constants/routerPaths';
import Api from '../../services/api/api';
import { useDidMount } from '../../utils/hooks';
import ModalActions from '../../store/actions/modalActions';

function AddThemeModal({ modal, isEdit }) {
  const [form, setForm] = useState({ name: '', questions: [{}] });
  const dispatch = useDispatch();
  useDidMount(() => {
    if (isEdit) {
      Api.getTheme(modal.additionalProps.id).then(response => {
        setForm(response);
      });
    }
  });
  const { id: discipline } = useParams(RouterPaths.discipline);
  const handleChange = useCallback(
    fieldName => event => {
      let value = event;
      if (
        event?.target?.value ||
        Object.getPrototypeOf(event).constructor.name === 'SyntheticEvent'
      ) {
        value = event.target?.value;
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
    Api.sendTheme({ ...form, discipline }).then(() => {
      dispatch(ModalActions.closeModal());
    });
  }, [dispatch, form, discipline]);

  return (
    <div className="add-theme">
      <div className="add-theme__title">
        <div className="add-theme__title-label">Название темы</div>
        <Input
          value={form.name}
          className="input add-theme__title-input"
          onChange={handleChange('name')}
        />
      </div>
      <MultipleForm
        value={form.questions}
        onChange={handleQuestionsChange}
        renderForm={QuestionEditForm}
      />

      {!isEdit && (
        <Button disabled={isEdit} onClick={handleSubmitForm}>
          Сохранить
        </Button>
      )}
    </div>
  );
}

export default AddThemeModal;
