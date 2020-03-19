import React, { useCallback, useState } from 'react';
import { Input, Select } from 'antd';
import { isEmpty } from 'lodash';
import './DisciplineCreateForm.scss';
import CssUtils from '../../../utils/sassUtils';
import Button from '../../button';

const { TextArea } = Input;
const { Option } = Select;

function DisciplineCreateForm() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    semester: '',
  });
  const semesters = [
    {
      name: 'Осенний семестр 2019/2020',
      id: '2019/2020-autumn',
    },
    {
      name: 'Весенний семестр 2019/2020',
      id: '2019/2020-spring',
    },
    {
      name: 'Осенний семестр 2020/2021',
      id: '2020/2021-autumn',
    },
    {
      name: 'Весенний семестр 2020/2021',
      id: '2020/2021-spring',
    },
  ];

  const [formData, setFormData] = useState({
    corTitle: false,
    corDescription: false,
    corSelect: false,
  });

  const setFormValue = name => event => {
    console.log(event);
    const value = event.target ? event.target.value : event;
    setForm({ ...form, [name]: value });
  };

  const validateForm = name => event => {
    console.log(event);
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
              <Option className="discipline-form__info-box-select-variant" value={item.id}>
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
            onChange={setFormValue('description')}
            onBlur={validateForm('corDescription')}
          />
        </div>
      </div>
      <Button>Сохранить</Button>
    </div>
  );
}

DisciplineCreateForm.propTypes = {};

export default DisciplineCreateForm;
