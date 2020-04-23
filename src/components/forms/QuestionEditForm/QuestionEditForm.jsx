import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';

import Answers from './Answers';
import './QuestionEditForm.scss';
import QuestionConstants from '../../../constants/questions';
import Upload from '../../Upload';

import { ReactComponent as PictureSVG } from '../../../static/images/svg/upload-picture.svg';
import { ReactComponent as ArrowSVG } from '../../../static/images/svg/arrow.svg';

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
        case QuestionConstants.questionTypes.INPUT_STRING:
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
            <div className="question-form__label">Введите вопрос</div>
            <TextArea
              className="question-form__text-area"
              value={form.name}
              onChange={handleChange('name')}
            />
          </div>
          <div className="question-form__row-item">
            <div className="question-form__column">
              <div className="question-form__column-item">
                <div className="question-form__label">Тип вопроса</div>
                <Select
                  value={form.type}
                  onChange={handleTypeChange}
                  placeholder="Выбор типа ответа"
                  suffixIcon={<ArrowSVG className="question-form__icon" />}
                  dropdownRender={menu => (
                    <div className="question-form__question-type-select">{menu}</div>
                  )}
                >
                  {QuestionConstants.allowedQuestionTypes.map(type => (
                    <Option key={type}>{QuestionConstants.questionTypesTitles[type]}</Option>
                  ))}
                </Select>
              </div>
              <div className="question-form__column-item">
                <Upload
                  className="question-form__upload"
                  value={form.image}
                  onChange={handleChange('image')}
                  label="Загрузить изображение к вопросу"
                  icon={<PictureSVG />}
                />
              </div>
            </div>
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

QuestionEditForm.defaultProps = {
  onChange: () => {},
};

export default QuestionEditForm;
