import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import './Upload.scss';

import { ReactComponent as AddSVG } from '../../static/images/svg/addImg.svg';
import { ReactComponent as DeleteSVG } from '../../static/images/svg/deleteImg.svg';

import { toBase64 } from '../../utils/base64Converter';
import CssUtils from '../../utils/sassUtils';

const SECONDARY_LABEL = 'Изменить изображение к вопросу';

function Upload({ value, label, icon, onChange }) {
  const [modifier, setModifier] = useState(false);

  const handleFileChange = useCallback(
    e => {
      const file = e.target.files[0];
      if (file) {
        toBase64(file).then(response => {
          onChange(response);
          setModifier(true);
        });
      }
    },
    [onChange]
  );

  return (
    <div className="upload">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
      <label>
        <div className={CssUtils.mergeModifiers('upload__panel', { secondary: modifier })}>
          {label && <p className="upload__label">{value ? SECONDARY_LABEL : label}</p>}
          <div className="upload__picture">
            {icon}
            {value ? <DeleteSVG className="upload__addon" /> : <AddSVG className="upload__addon" />}
          </div>
        </div>
        <input className="upload__input" type="file" onChange={handleFileChange} />
      </label>
    </div>
  );
}

Upload.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
  onChange: PropTypes.func.isRequired,
};

Upload.defaultProps = {
  label: undefined,
};

export default Upload;
