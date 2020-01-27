import React, { useState, useCallback } from 'react';
import { Input, Select } from 'antd';

import Answers from './Answers';
import { ReactComponent as CloseSVG } from '../../../static/images/svg/close.svg';
import './QuestionEditForm.scss';
import QuestionConstants from '../../../constants/questions';

const { TextArea } = Input;
const { Option } = Select;

function QuestionEditForm({ onChange, form }) {
  const handleChangeType = useCallback(
    fieldname => e => {
      let value = e;
      if (e?.target?.value) {
        value = e.target?.value;
      }
      onChange({ ...form, [fieldname]: value });
    },
    [form, onChange]
  );

  return (
    <div className="question-form">
      <div className="question-form__row">
        <div className="question-form__row-item">
          <div className="question-form__label">Текст вопроса</div>
          <TextArea value={form.text} onChange={handleChangeType('text')} />
        </div>
        <div className="question-form__row-item">
          <div className="question-form__label">Тип вопроса</div>
          <Select value={form.questionType} onChange={handleChangeType('questionType')}>
            {QuestionConstants.allowedQuestionTypes.map(type => (
              <Option key={type}>{QuestionConstants.questionTypesTitles[type]}</Option>
            ))}
          </Select>
        </div>
      </div>
      {/*<div className="question-form__row">*/}
      {/*  <div className="question-form__row-item">*/}
      {/*    <Input size="large" className="variant" addonBefore="1" addonAfter={<CloseSVG />} />*/}
      {/*  </div>*/}
      {/*</div>*/}
      <Answers type={form.questionType} />
    </div>
  );
}

export default QuestionEditForm;
