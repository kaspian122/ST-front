import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';
import { useParams } from 'react-router';
import './DisciplineCreateForm.scss';
import CssUtils from '../../../utils/sassUtils';

import RouterPaths from '../../../constants/routerPaths';
const { TextArea } = Input;
const { Option } = Select;

function DisciplineCreateForm() {
  const [form, setForm] = useState({});
  const semesters = [
    {
      title: 'Осенний семестр 2019/2020',
      value: '2019/2020-autumn',
    },
    {
      title: 'Весенний семестр 2019/2020',
      value: '2019/2020-spring',
    },
    {
      title: 'Осенний семестр 2020/2021',
      value: '2020/2021-autumn',
    },
    {
      title: 'Весенний семестр 2020/2021',
      value: '2020/2021-spring',
    },
  ];

  const [corTitle, setCorTitle] = useState(false);
  const [corDescription, setCorDescription] = useState(false);
  const [corSelect, setCorSelect] = useState(false);

  const handleChangeDesc = useCallback(
    name => event => {
      const description = event.target.value;
      setForm({ ...form, description });
      if (description !== '') {
        setCorDescription(true);
      } else {
        setCorDescription(false);
      }
    },
    [form, setForm]
  );

  const handleChangeTitle = useCallback(
    name => event => {
      const title = event.target.value;
      setForm({ ...form, title });
      if (title !== '') {
        setCorTitle(true);
      } else {
        setCorTitle(false);
      }
    },
    [form, setForm]
  );

  const handleSelect = useCallback(
    name => event => {
      const period = event;
      setForm(prevState => ({ ...prevState, period }));
      setCorSelect(true);
    },
    [setForm]
  );

  return (
    <div className="discipline-form">
      <div className="discipline-form__info">
        <div className="discipline-form__info-label">Ведите название дисциплины</div>
        <div className="discipline-form__info-box">
          <Input
            className={CssUtils.mergeModifiers('discipline-form__info-box-input', {
              incorrect: !corTitle,
            })}
            onChange={handleChangeTitle('title')}
          />
          <Select
            onSelect={handleSelect('select')}
            className={CssUtils.mergeModifiers('discipline-form__info-box-select', {
              incorrect: !corSelect,
            })}
            placeholder="Выберете семстр"
          >
            {semesters.map(item => (
              <Option className="discipline-form__info-box-select-variant" value={item.value}>
                {item.title}
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
              incorrect: !corDescription,
            })}
            onChange={handleChangeDesc('description')}
          />
        </div>
      </div>
    </div>
  );
}

DisciplineCreateForm.propTypes = {};

export default DisciplineCreateForm;
