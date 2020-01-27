import React from 'react';
import { ReactComponent as AddSVG } from '../../static/images/svg/add.svg';

import './MultipleForm.scss';

function MultipleForm({ onChange }) {
  return (
    <div className="multiple-form">
      <div className="multiple-form__selector">
        {[1, 2, 3].map((item, index) => (
          <div className="multiple-form__selector-item">{index + 1}</div>
        ))}
        <div className="multiple-form__selector-item multiple-form__selector-item--active">123</div>
        <div className="multiple-form__selector-item multiple-form__selector-item--new">
          <AddSVG />
        </div>
      </div>
    </div>
  );
}

export default MultipleForm;
