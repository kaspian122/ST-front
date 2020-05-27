import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Input } from 'antd';

import './Variants.scss';
import Upload from '../../Upload';
import QuestionConstants from '../../../constants/questions';

import { ReactComponent as CloseSVG } from '../../../static/images/svg/close.svg';
import { ReactComponent as AddSVG } from '../../../static/images/svg/add.svg';
import { ReactComponent as CheckSVG } from '../../../static/images/svg/check.svg';
import { ReactComponent as PictureSVG } from '../../../static/images/svg/upload-picture.svg';
import CssUtils from '../../../utils/sassUtils';

const QuestionTypes = QuestionConstants.questionTypes;
const QuestionLabels = QuestionConstants.questionTypesLabels;

function Item({
  index,
  value,
  isCorrect,
  image,
  onClose,
  onChange,
  onChangeImage,
  onSelectCorrect,
  mode,
}) {
  const handleClose = useCallback(() => {
    onClose(index);
  }, [index, onClose]);

  const handleChange = useCallback(
    e => {
      onChange(e?.target?.value);
    },
    [onChange]
  );

  const handleSelectCorrect = useCallback(() => {
    onSelectCorrect(index);
  }, [onSelectCorrect, index]);

  return (
    <div className="variant__row">
      <div className="variant__row-item">
        <Input
          id={index}
          value={value}
          placeholder="Введите вариант ответа"
          size="large"
          className={CssUtils.mergeModifiers('variant', { selected: isCorrect })}
          addonBefore={
            mode === QuestionTypes.SEQUENCE || mode === QuestionTypes.CONFORMITY ? (
              index + 1
            ) : (
              <span onClick={handleSelectCorrect}>
                <CheckSVG />
              </span>
            )
          }
          onChange={handleChange}
          addonAfter={
            <span onClick={handleClose}>
              <CloseSVG />
            </span>
          }
        />
      </div>
      <div className="variant__row-item">
        <Upload value={image} onChange={onChangeImage} hasLabel={false} icon={<PictureSVG />} />
      </div>
    </div>
  );
}

Item.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(QuestionConstants.allowedQuestionTypes).isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeImage: PropTypes.func.isRequired,
  onSelectCorrect: PropTypes.func.isRequired,
};

function NewItem({ onClick }) {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <Input
      value="Добавить вариант"
      readOnly
      size="large"
      className="variant variant--new"
      addonBefore={<AddSVG />}
      onClick={handleClick}
    />
  );
}

NewItem.propTypes = { onClick: PropTypes.func.isRequired };

function Variants({ value, onAdd, onDelete, onChange, onChangeImage, onSelectCorrect, mode }) {
  return (
    <div className="variant__answers-multiple">
      {!isEmpty(value) ? (
        <div className="question-form__row">
          <div className="question-form__row-item">
            <div className="question-form__label">{QuestionLabels[mode]}</div>
            {value.map((item, index) => (
              <Item
                index={index}
                value={item.name}
                isCorrect={item.is_correct}
                image={item.image}
                onClose={onDelete(index)}
                onChange={onChange(index)}
                onChangeImage={onChangeImage(index)}
                onSelectCorrect={onSelectCorrect}
                mode={mode}
              />
            ))}
            <NewItem onClick={onAdd} />
          </div>
        </div>
      ) : (
        <div className="question-form__row question-form__row--half">
          <div className="question-form__row-item">
            <div className="question-form__label">{QuestionLabels[mode]}</div>
            <NewItem onClick={onAdd} />
          </div>
        </div>
      )}
    </div>
  );
}

Variants.propTypes = {
  value: PropTypes.arrayOf(PropTypes.shape({ is_correct: PropTypes.bool, name: PropTypes.string }))
    .isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onChangeImage: PropTypes.func.isRequired,
  onSelectCorrect: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(QuestionConstants.allowedQuestionTypes).isRequired,
};

Variants.defaultProps = {
  onDelete: () => {},
};

export default Variants;
