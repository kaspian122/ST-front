import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Select } from 'antd';
import { isEmpty } from 'lodash';
import { useHistory, useParams } from 'react-router';
import './DisciplineCreateForm.scss';
import PropTypes from 'prop-types';
import Button from '../../button';
import CssUtils from '../../../utils/sassUtils';
import Api from '../../../services/api/api';
import { useDidMount } from '../../../utils/hooks';
import RouterPaths from '../../../constants/routerPaths';

import ModalActions from '../../../store/actions/modalActions';
import { ModalTypes } from '../../../constants/modalConstants';

const { TextArea } = Input;
const { Option } = Select;

function DisciplineCreateForm({ isEdit }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form, setForm] = useState({
    name: '',
    description: '',
    semester: '',
  });
  const [formData, setFormData] = useState({
    corTitle: false,
    corDescription: false,
    corSelect: false,
  });
  const [semesters, setSemesters] = useState([{ id: null, name: '' }]);
  const discipline = useParams(RouterPaths.discipline);

  const handleEditClick = () => {
    Api.editDiscipline(discipline.id, form).then(dispatch(ModalActions.closeModal()));
  };

  const handleDeleteClick = () => {
    dispatch(
      ModalActions.openModal(ModalTypes.WARNING, {
        title: 'Удаление дисциплины',
        onOk: () => {
          Api.deleteDiscipline(discipline.id).then(dispatch(ModalActions.closeModal()));
        },
        text: 'Вы уверены, что хотите удалить дисциплину?',
        acceptTitle: 'Ок',
      })
    );
  };

  const handleSaveClick = () => {
    if (
      formData.corTitle === false &&
      formData.corDescription === false &&
      formData.corSelect === false
    ) {
      dispatch(
        ModalActions.openModal(ModalTypes.WARNING, {
          title: 'Сохранение дисциплины',
          onOk: () => {
            if (form.description && form.name && form.semester) {
              Api.createDiscipline(form).then(() => {
                history.push(RouterPaths.disciplines);
              });
            }
          },
          text: 'Вы уверены, что хотите выйти из раздела? Дисциплина будет добавлена.',
        })
      ); // PortalActions.openPortal(PortalTypes.CORRECT_DISCIPLINE));
    }
  };

  const setFormValue = name => event => {
    const value = event.target ? event.target.value : event;
    setForm({ ...form, [name]: value });
  };

  const validateForm = name => event => {
    const value = event && event.target ? event.target.value : event;
    setFormData({ ...formData, [name]: isEmpty(value) });
  };

  useDidMount(() => {
    Api.getSemester().then(response => {
      setSemesters(response);
    });
    if (isEdit) {
      Api.getDiscipline(discipline.id).then(response => {
        setForm(response);
      });
    }
  });

  return (
    <div className="discipline-form">
      {isEdit && (
        <div className="discipline-form__delete-button" onClick={handleDeleteClick}>
          удалить дисциплину
        </div>
      )}
      <div className="discipline-form__info">
        <div className="discipline-form__info-label">Ведите название дисциплины</div>
        <div className="discipline-form__info-box">
          <Input
            className={CssUtils.mergeModifiers('discipline-form__info-box-input', {
              incorrect: formData.corTitle,
            })}
            autoFocus
            value={form.name}
            onChange={setFormValue('name')}
            onBlur={validateForm('corTitle')}
          />
          <Select
            onSelect={setFormValue('semester')}
            onBlur={validateForm('corSelect')}
            className={CssUtils.mergeModifiers('discipline-form__info-box-select', {
              incorrect: formData.corSelect,
            })}
            placeholder="Выберите семестр"
          >
            {semesters.map(item => (
              <Option
                className="discipline-form__info-box-select-variant"
                value={item.name}
                key={item.id}
              >
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
        <div className="discipline-form__description">
          <div className="discipline-form__description-label">
            Введиете описание дисциплины / ссылки на литературу
          </div>
          <TextArea
            className={CssUtils.mergeModifiers('discipline-form__description-text', {
              incorrect: formData.corDescription,
            })}
            value={form.description}
            onChange={setFormValue('description')}
            onBlur={validateForm('corDescription')}
          />
        </div>
      </div>
      <Button
        parentBlock="discipline-form"
        type="submit"
        onClick={isEdit ? handleEditClick : handleSaveClick}
      >
        Сохранить
      </Button>
    </div>
  );
}

DisciplineCreateForm.propTypes = {
  isEdit: PropTypes.bool,
};

DisciplineCreateForm.defaultProps = {
  isEdit: false,
};

export default DisciplineCreateForm;
