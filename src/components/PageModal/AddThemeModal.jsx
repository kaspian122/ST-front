import React from 'react';
import { Input } from 'antd';
import MultipleForm from '../multipleForm';
import { QuestionEditForm } from '../forms';

import './AddThemeModal.scss';

function AddThemeModal() {
  return (
    <div className="add-theme">
      <div className="add-theme__title">
        <span className="add-theme__title-label">Название темы</span>
        <Input className="add-theme__title-input" />
      </div>
      <MultipleForm renderForm={QuestionEditForm} />
    </div>
  );
}

export default AddThemeModal;
