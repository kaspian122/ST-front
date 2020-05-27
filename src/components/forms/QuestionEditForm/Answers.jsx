import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import QuestionConstants from '../../../constants/questions';
import Variants from './Variants';

const QuestionTypes = QuestionConstants.questionTypes;
const QuestionLabels = QuestionConstants.questionTypesLabels;

function isNAN(value) {
  const n = Number(value);
  // eslint-disable-next-line eqeqeq
  return n != value;
}

function Answers({ onChange, type, value }) {
  const handleNumberChange = useCallback(
    e => {
      const val = e?.target?.value;
      if (!isNAN(val) || val === '-') {
        onChange([{ is_correct: true, name: val }]);
      }
    },
    [onChange]
  );

  const handleStringChange = useCallback(
    e => {
      const val = e?.target?.value;
      onChange([{ is_correct: true, name: val }]);
    },
    [onChange]
  );

  const handleAddVariant = useCallback(() => {
    onChange([...value, { is_correct: false }]);
  }, [value, onChange]);

  const handleChangeVariant = useCallback(
    pk => val => {
      const curValue = [...value];
      curValue[pk].name = val;
      onChange(curValue);
    },
    [value, onChange]
  );

  const handleChangeImageVariant = useCallback(
    pk => val => {
      const curValue = [...value];
      curValue[pk].image = val;
      onChange(curValue);
    },
    [value, onChange]
  );

  const handleSelectVariant = useCallback(
    pks => {
      const curValue = [...value];
      onChange(
        curValue.map((item, index) => ({
          ...item,
          is_correct: String(pks) === String(index),
        }))
      );
    },
    [value, onChange]
  );

  const handleSelectVariants = useCallback(
    pk => {
      const curValue = [...value];
      curValue[pk].is_correct = !curValue[pk].is_correct;
      onChange(curValue);
    },
    [value, onChange]
  );

  const handleDeleteVariant = useCallback(
    pk => () => {
      const curValue = [...value];
      curValue.splice(pk, 1);
      onChange(curValue);
    },
    [value, onChange]
  );

  switch (type) {
    case QuestionTypes.SINGLE:
      return (
        <Variants
          value={value}
          onChange={handleChangeVariant}
          onChangeImage={handleChangeImageVariant}
          onSelectCorrect={handleSelectVariant}
          onDelete={handleDeleteVariant}
          onAdd={handleAddVariant}
          mode={QuestionTypes.SINGLE}
        />
      );
    case QuestionTypes.MULTIPLE:
      return (
        <Variants
          value={value}
          onChange={handleChangeVariant}
          onChangeImage={handleChangeImageVariant}
          onSelectCorrect={handleSelectVariants}
          onDelete={handleDeleteVariant}
          onAdd={handleAddVariant}
          mode={QuestionTypes.MULTIPLE}
        />
      );
    case QuestionTypes.INPUT_NUMBER:
      return (
        <div className="question-form__row question-form__row--half">
          <div className="question-form__row-item">
            <div className="question-form__label"> {QuestionLabels[type]} </div>
            <Input
              className="question-form__input"
              value={value && value[0].name}
              onChange={handleNumberChange}
            />
          </div>
        </div>
      );
    case QuestionTypes.INPUT_STRING:
      return (
        <div className="question-form__row question-form__row--half">
          <div className="question-form__row-item">
            <div className="question-form__label"> {QuestionLabels[type]} </div>
            <Input
              className="question-form__input"
              value={value && value[0].name}
              onChange={handleStringChange}
            />
          </div>
        </div>
      );
    case QuestionTypes.SEQUENCE:
      return (
        <Variants
          value={value}
          onChange={handleChangeVariant}
          onChangeImage={handleChangeImageVariant}
          onSelectCorrect={handleSelectVariant}
          onDelete={handleDeleteVariant}
          onAdd={handleAddVariant}
          mode={QuestionTypes.SEQUENCE}
        />
      );
    case QuestionTypes.CONFORMITY:
      return (
        <Variants
          value={value}
          onChange={handleChangeVariant}
          onChangeImage={handleChangeImageVariant}
          onSelectCorrect={handleSelectVariant}
          onDelete={handleDeleteVariant}
          onAdd={handleAddVariant}
          mode={QuestionTypes.CONFORMITY}
        />
      );
    default:
  }
  return <></>;
}

Answers.propTypes = {
  onChange: PropTypes.func,
  type: PropTypes.oneOf(QuestionConstants.allowedQuestionTypes).isRequired,
  value: PropTypes.array,
};
Answers.defaultProps = { onChange: () => {}, value: [] };

export default Answers;
