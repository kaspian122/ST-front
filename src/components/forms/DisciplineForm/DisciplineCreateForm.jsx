import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';

import './DisciplineCreateForm.scss';

const { TextArea } = Input;
const { Option } = Select;

function DisciplineCreateForm() {
  const [form, setForm] = useState();

  return (
    <div className="discipline-form">
      <div className="discipline-form__info">
        <div className="discipline-form__info-label">Ведите название дисциплины</div>
        <div className="discipline-form__info-box">
          <Input
            className="discipline-form__info-box-input"
            onChange={event => {
              const title = event.target.value;
              setForm(prevState => ({ ...prevState, title }));
            }}
          />
          <Select
            onSelect={event => {
              const period = event;
              setForm(prevState => ({ ...prevState, period }));
            }}
            className="discipline-form__info-box-select"
            placeholder="Выберете семстр"
          >
            <Option className="discipline-form__info-box-select-variant" value="2019/2020-autumn">
              Осенний семестр 2019/2020
            </Option>
            <Option className="discipline-form__info-box-select-variant" value="2019/2020-spring">
              Весенний семестр 2019/2020
            </Option>
            <Option className="discipline-form__info-box-select-variant" value="2020/2021-autumn">
              Осенний семестр 2020/2021
            </Option>
            <Option className="discipline-form__info-box-select-variant" value="2020/2021-spring">
              Весенний семестр 2020/2021
            </Option>
          </Select>
        </div>
      </div>

      <div className="discipline-form__description">
        <div className="discipline-form__description-label">
          Введиете описание дисциплины / ссылки на литературу
        </div>
        <TextArea
          className="discipline-form__description-text erro"
          onChange={event => {
            const description = event.target.value;
            setForm(prevState => ({ ...prevState, description }));
          }}
        />
      </div>
    </div>
  );
}

DisciplineCreateForm.propTypes = {};

export default DisciplineCreateForm;
