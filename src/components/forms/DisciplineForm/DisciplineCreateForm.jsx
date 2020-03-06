import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';

import './DisciplineCreateForm.scss';
import GovnoUpload from '../../govnoUpload';

const { TextArea } = Input;
const { Option } = Select;

function DisciplineCreateForm() {
  return (
    <div className="discipline-form">
      <div className="discipline-form__info">
        <div className="discipline-form__info-label">Ведите название дисциплины</div>
        <div className="discipline-form__info-box">
          <Input
            className="discipline-form__info-box-input"
            onChange={event => {
              console.log(event.target.value);
            }}
          />
          <Select className="discipline-form__info-box-select" placeholder="Выберете семстр">
            <Option className="discipline-form__info-box-select-variant" value="1">
              Осенний семестр 2019/2020
            </Option>
            <Option className="discipline-form__info-box-select-variant" value="2">
              Весенний семестр 2019/2020
            </Option>
            <Option className="discipline-form__info-box-select-variant" value="3">
              Осенний семестр 2020/2021
            </Option>
            <Option className="discipline-form__info-box-select-variant" value="4">
              Весенний семестр 2020/2021
            </Option>
          </Select>
        </div>
      </div>

      <div className="discipline-form__description">
        <div className="discipline-form__description-label">
          Введиете описание дисциплины / ссылки на литературу
        </div>
        <TextArea className="discipline-form__description-text" />
      </div>
    </div>
  );
}

DisciplineCreateForm.propTypes = {};

export default DisciplineCreateForm;
