import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';

import Answers from './Answers';
import './QuestionEditForm.scss';
import QuestionConstants from '../../../constants/questions';

const { TextArea } = Input;
const { Option } = Select;

function QuestionEditForm({ onChange, form }) {
  const handleChange = useCallback(
    fieldName => e => {
      let value = e;
      if (e?.target?.value || Object.getPrototypeOf(e).constructor.name === 'SyntheticEvent') {
        value = e.target?.value;
      }
      onChange({ ...form, [fieldName]: value });
    },
    [form, onChange]
  );

  const handleComplexChange = useCallback(
    obj => {
      onChange({ ...form, ...obj });
    },
    [form, onChange]
  );

  const handleTypeChange = useCallback(
    value => {
      const res = {};
      // handleChange('type')(value);
      res.type = value;
      switch (value) {
        case QuestionConstants.questionTypes.MULTIPLE:
        case QuestionConstants.questionTypes.SINGLE:
          res.answers = [];
          break;
        case QuestionConstants.questionTypes.INPUT_NUMBER:
          res.answers = [{}];
          break;
        default:
      }

      handleComplexChange(res);
    },
    [handleComplexChange]
  );
  return (
    form && (
      <div className="question-form">
        <div className="question-form__row">
          <div className="question-form__row-item">
            <div className="question-form__label">Текст вопроса</div>
            <TextArea className="input" value={form.name} onChange={handleChange('name')} />
          </div>
          <div className="question-form__row-item">
            <div className="question-form__label">Тип вопроса</div>
            <Select value={form.type} onChange={handleTypeChange}>
              {QuestionConstants.allowedQuestionTypes.map(type => (
                <Option key={type}>{QuestionConstants.questionTypesTitles[type]}</Option>
              ))}
            </Select>
          </div>
        </div>
        <Answers value={form.answers} onChange={handleChange('answers')} type={form.type} />
      </div>
    )
  );
}

QuestionEditForm.propTypes = {
  form: PropTypes.shape({
    text: PropTypes.string,
    type: PropTypes.oneOf(QuestionConstants.allowedQuestionTypes),
    answers: PropTypes.arrayOf(
      PropTypes.shape({ name: PropTypes.string.isRequired, is_correct: PropTypes.bool.isRequired })
    ),
  }).isRequired,
  onChange: PropTypes.func,
};

export default QuestionEditForm;
