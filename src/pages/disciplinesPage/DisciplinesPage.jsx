import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Input } from 'antd';

import { useDidMount } from '../../utils/hooks';
import DisciplinesActions from '../../store/actions/disciplinesActions';
import BadgeList from '../../components/badgeList';

import { ReactComponent as LupaSVG } from '../../static/images/svg/lupa.svg';
import './DisciplinesPage.scss';
import NewDiscipline from '../../components/discipline/NewDiscipline';
import RouterPaths from '../../constants/routerPaths';

function DisciplinesPage({ setTitle = () => {}, items, onClick, onNewClick, newText }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const disciplines = useSelector(state => state.disciplines);
  const handleNewDisciplineClick = useCallback(() => {
    history.push(RouterPaths.newDiscipline);
  }, [history]);

  useDidMount(() => {
    dispatch(DisciplinesActions.setDisciplines());
    setTitle('Дисциплины');
  });

  const handleDisciplineClick = useCallback(
    item => {
      history.push(`/disciplines/${item.id}`);
    },
    [history]
  );

  return (
    <div className="disciplines-page">
      <div className="disciplines-page__actions">
        <Input
          className="disciplines-page__search"
          placeholder="ПОИСК ДИСЦИПЛИНЫ"
          prefix={<LupaSVG />}
        />
        <NewDiscipline
          className="disciplines-page__add"
          text="Добавить дисциплину"
          onClick={handleNewDisciplineClick}
        />
      </div>
      <div className="disciplines-page__disciplines">
        <BadgeList
          items={disciplines}
          keyMap={{ title: 'name', info: 'description' }}
          onClick={handleDisciplineClick}
        />
      </div>
    </div>
  );
}

DisciplinesPage.propTypes = {
  setTitle: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  onNewClick: PropTypes.func,
  newText: PropTypes.string,
};
DisciplinesPage.defaultProps = {
  onClick: () => {},
  onNewClick: undefined,
  newText: 'Пропсу забыл текста Э',
};
export default DisciplinesPage;
