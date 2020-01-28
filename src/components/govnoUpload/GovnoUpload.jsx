import React, { useCallback } from 'react';
import { Input } from 'antd';

const toBase64 = async file =>
  new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    } else reject(new Error('TI PIDAR'));
  });

function GovnoUpload({ onChange }) {
  const handleFileChange = useCallback(async e => {
    const fbs64 = await toBase64(e.target.files[0]);
    onChange(fbs64);
  });
  return <Input type="file" onChange={handleFileChange} />;
}

export default GovnoUpload;
