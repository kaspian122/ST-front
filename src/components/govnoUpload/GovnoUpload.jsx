import React, { useCallback } from 'react';

const toBase64 = file =>
  new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    } else reject(new Error('TI PIDAR'));
  });

function GovnoUpload({ value, onChange }) {
  const handleFileChange = useCallback(
    async e => {
      const fbs64 = await toBase64(e.target.files[0]);
      onChange(fbs64);
    },
    [onChange]
  );

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
      <label>
        <div style={{ padding: '5px', display: 'inline-block', border: '1px solid blue' }}>
          Загрузи
        </div>
        <div>{value && 'есть прикрепление'}</div>
        <input style={{ display: 'none' }} type="file" onChange={handleFileChange} />
      </label>
      {value && <img src={value} style={{ width: '100px' }} alt="gavno" />}
    </div>
  );
}

export default GovnoUpload;
