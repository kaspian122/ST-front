import React from 'react';

import './Badge.scss';

function Badge({ title, info }) {
  return (
    <div className="badge">
      <div className="badge__title">{title}</div>
      {info && <div className="badge__info">{info}</div>}
    </div>
  );
}

export default Badge;
