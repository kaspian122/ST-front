import React from 'react';
import { Input, Select } from 'antd';

import './AddThemeBlock.scss';

const { Option } = Select;

function AddThemeBlock(props) {
  const { count, themes = [], theme, id, onThemeChange } = props;
  const handleThemeChange = value => {
    onThemeChange(id, { theme: value, count });
  };
  const handleCountChange = event => {
    onThemeChange(id, { theme: theme.id, count: event.target.value });
  };
  return (
    <div className="add-theme-block">
      <Select
        onChange={handleThemeChange}
        placeholder="Не указана"
        style={{ width: '390px', 'margin-right': '20px' }}
      >
        {themes.map(item => (
          <Option key={item.id} value={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
      <Input onChange={handleCountChange} value={count} className="input add-theme-block__count" />
    </div>
  );
}

export default AddThemeBlock;
