import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Badge from '../badge';

import './BadgeList.scss';
import NewBadge from '../badge/NewBadge';

const defaultMap = { title: 'title', info: 'info', key: 'id' };

function BadgeList({ items, keyMap, onClick, onNewClick, newText }) {
  console.log(items);
  const formatItem = useCallback(
    item =>
      Object.entries(Object.assign({}, defaultMap, keyMap)).reduce((acc, [key, mapper]) => {
        let value;
        if (typeof mapper === 'function') {
          value = mapper(item);
        } else {
          value = item[mapper];
        }
        return { ...acc, [key]: value };
      }, {}),
    [keyMap]
  );
  return (
    <div className="badge-list">
      <NewBadge text={newText} onClick={onNewClick} />
      {items.map(item => (
        <Badge {...formatItem(item)} item={item} onClick={onClick} />
      ))}
    </div>
  );
}

BadgeList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  keyMap: PropTypes.shape({
    title: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    info: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    key: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  }),
  onClick: PropTypes.func,
  onNewClick: PropTypes.func,
  newText: PropTypes.string,
};

BadgeList.defaultProps = {
  keyMap: defaultMap,
  onClick: () => {},
  onNewClick: undefined,
  newText: 'Пропсу забыл текста Э',
};

export default BadgeList;
