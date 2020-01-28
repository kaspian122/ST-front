import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import QuestionConstants from '../../../constants/questions';
import Variants from './Variants';

const QuestionTypes = QuestionConstants.questionTypes;

function isNANI(value) {
  const n = Number(value);
  // eslint-disable-next-line eqeqeq
  return n != value;
}

function Answers({ onChange, type, value }) {
  const handleNumberChange = useCallback(
    e => {
      const val = e?.target?.value;
      if (!isNANI(val) || val === '-') {
        onChange([{ is_correct: true, name: val }]);
      }
    },
    [onChange]
  );

  const handleAddVariant = useCallback(() => {
    onChange([...value, { is_correct: false }]);
  }, [value, onChange]);

  const handleChangeVariant = useCallback(
    pk => val => {
      const prevValue = [...value];
      prevValue[pk].name = val;
      onChange(prevValue);
    },
    [value, onChange]
  );

  const handleSelectVariant = useCallback(
    pks => {
      const prevValue = [...value];
      onChange(
        prevValue.map((it, index) => ({
          ...it,
          is_correct: Array.isArray(pks)
            ? pks.map(String).includes(String(index))
            : String(pks) === String(index),
        }))
      );
    },
    [value, onChange]
  );

  const handleDeleteVariant = useCallback(
    pk => () => {
      const prevValue = [...value];
      prevValue.splice(pk, 1);
      onChange(prevValue);
    },
    [value, onChange]
  );

  switch (type) {
    case QuestionTypes.INPUT_NUMBER:
      return (
        <div className="question-form__row question-form__row--half">
          <div className="question-form__row-item">
            <div className="question-form__label">Правильный ответ</div>
            <Input className="input" value={value && value[0].name} onChange={handleNumberChange} />
          </div>
        </div>
      );
    case QuestionTypes.SINGLE:
      return (
        <Variants
          value={value}
          onChange={handleChangeVariant}
          onSelectCorrect={handleSelectVariant}
          onDelete={handleDeleteVariant}
          onAdd={handleAddVariant}
        />
      );
    case QuestionTypes.MULTIPLE:
      return (
        <Variants
          value={value}
          onChange={handleChangeVariant}
          onSelectCorrect={handleSelectVariant}
          onDelete={handleDeleteVariant}
          onAdd={handleAddVariant}
          multiple
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
