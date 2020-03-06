import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { Input } from 'antd';
import './AddDisciplineModal.scss';
import Button from '../button';
import RouterPaths from '../../constants/routerPaths';
import Api from '../../services/api/api';
import { useDidMount } from '../../utils/hooks';
import ModalActions from '../../store/actions/modalActions';

import DisciplineCreateForm from '../forms/DisciplineForm/DisciplineCreateForm';
import { QuestionEditForm } from '../forms';
import MultipleForm from '../multipleForm';

function AddDisciplineModal({ modal, isEdit }) {
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
    fieldName => e => {
      let value = e;
      if (e?.target?.value || Object.getPrototypeOf(e).constructor.name === 'SyntheticEvent') {
        value = e.target?.value;
      }
      setForm(prevState => ({ ...prevState, [fieldName]: value }));
    },
    [setForm]
  );

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
        <DisciplineCreateForm />
      </div>

      {!isEdit && (
        <Button disabled={isEdit} onClick={handleSubmitForm}>
          Сохранить
        </Button>
      )}
    </div>
  );
}

export default AddDisciplineModal;
