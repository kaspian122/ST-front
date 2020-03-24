import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Select } from 'antd';
import { isEmpty } from 'lodash';
import { useHistory, useRouteMatch } from 'react-router';
import './DisciplineCreateForm.scss';
import Button from '../../button';
import CssUtils from '../../../utils/sassUtils';
import Api from '../../../services/api/api';
import { useDidMount } from '../../../utils/hooks';
import RouterPaths from '../../../constants/routerPaths';
import PortalActions from '../../../store/actions/portalsAction';

import { PortalTypes } from '../../../constants/portalConstants';

const { TextArea } = Input;
const { Option } = Select;

function DisciplineCreateForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { params } = useRouteMatch(RouterPaths.newdiscipline);
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
  const INIsemesters = [
    {
      name: 'Осенний семестр 2019/2020',
      id: 24436,
    },
  ];

  const [semesters, setSemesters] = useState(INIsemesters);
  const handleSaveClick = () => {
    dispatch(PortalActions.openPortal(PortalTypes.CLOSE_CORRECT_DISCIPLINE));
    if (
      formData.corTitle === false &&
      formData.corDescription === false &&
      formData.corSelect === false
    ) {
      Api.createDiscipline(form).then(() => history.push('/disciplines'));
    }
  };

  useDidMount(() => {
    Api.getSemester(params.id).then(response => {
      setSemesters(response);
    });
  });

  const setFormValue = name => event => {
    const value = event.target ? event.target.value : event;
    setForm({ ...form, [name]: value });
  };

  const validateForm = name => event => {
    const value = event && event.target ? event.target.value : event;
    setFormData({ ...formData, [name]: isEmpty(value) });
  };

  return (
    <div className="discipline-form">
      <div className="discipline-form__info">
        <div className="discipline-form__info-label">Ведите название дисциплины</div>
        <div className="discipline-form__info-box">
          <Input
            className={CssUtils.mergeModifiers('discipline-form__info-box-input', {
              incorrect: formData.corTitle,
            })}
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
            placeholder="Выберете семстр"
          >
            {semesters.map(item => (
              <Option
                className="discipline-form__info-box-select-variant"
                value={item}
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
      <Button onClick={handleSaveClick}>Сохранить</Button>
    </div>
  );
}

export default DisciplineCreateForm;
