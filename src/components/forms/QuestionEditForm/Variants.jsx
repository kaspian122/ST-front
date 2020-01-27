import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Input, Select } from 'antd';

import { ReactComponent as CloseSVG } from '../../../static/images/svg/close.svg';
import { ReactComponent as AddSVG } from '../../../static/images/svg/add.svg';

const { Option } = Select;

function Item({ pk, value, onClose, onChange }) {
  const handleClose = useCallback(() => {
    onClose(pk);
  }, [pk, onClose]);

  const handleChange = useCallback(
    e => {
      onChange(e?.target?.value);
    },
    [onChange]
  );

  return (
    <Input
      value={value}
      size="large"
      className="variant"
      addonBefore={pk + 1}
      onChange={handleChange}
      addonAfter={
        <span onClick={handleClose}>
          <CloseSVG />
        </span>
      }
    />
  );
}

Item.propTypes = {
  pk: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
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

function Variants({ value, onAdd, onDelete, onChange, onSelectCorrect, multiple }) {
  return (
    <div className="question-form__answers-multiple">
      {!isEmpty(value) ? (
        <div className="question-form__row">
          <div className="question-form__row-item">
            <div className="question-form__label">Варианты ответа</div>
            {value.map((it, index) => (
              <Item
                pk={index}
                value={it.name}
                onClose={onDelete(index)}
                onChange={onChange(index)}
              />
            ))}
            <NewItem onClick={onAdd} />
          </div>
          <div className="question-form__row-item">
            <div className="question-form__label">Правильный вариант</div>
            <Select
              value={
                multiple
                  ? value
                      .map((it, index) => ({ ...it, pk: index }))
                      .filter(it => it.name && it.is_correct)
                      .map(it => String(it.pk))
                  : value.find(it => it.is_correct)?.name
              }
              mode={multiple ? 'multiple' : 'default'}
              size="large"
              onChange={onSelectCorrect}
            >
              {value
                .map((it, index) => ({ ...it, pk: index }))
                .filter(it => it.name)
                .map(it => (
                  <Option key={String(it.pk)} title={it.name}>
                    {it.name}
                  </Option>
                ))}
            </Select>
          </div>
        </div>
      ) : (
        <div className="question-form__row question-form__row--half">
          <div className="question-form__row-item">
            <div className="question-form__label">Варианты ответа</div>
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
  onSelectCorrect: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
};

Variants.defaultProps = {
  onDelete: () => {},
  multiple: false,
};

export default Variants;
