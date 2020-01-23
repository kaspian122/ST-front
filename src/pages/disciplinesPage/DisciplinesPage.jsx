import React, { useCallback } from 'react';

import './DisciplinesPage.scss';
import { useHistory } from 'react-router-dom';
import { useDidMount } from '../../utils/hooks';
import { useDispatch, useSelector } from 'react-redux';
import DisciplinesActions from '../../store/actions/disciplinesActions';
import BadgeList from '../../components/badgeList';
import PropTypes from 'prop-types';

function DisciplinesPage({ setTitle = () => {} }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const disciplines = useSelector(state => state.disciplines);

  useDidMount(() => {
    dispatch(DisciplinesActions.setDisciplines());
    setTitle('Дисциплины');
  });

  const handleDisciplineClick = useCallback(item => {
    history.push(`/disciplines/${item.id}`);
  }, [history]);

  return (
    <div className="disciplines-page">
      {/*<div className="disciplines-page__actions">*/}

      {/*  <div className="disciplines-page__search"></div>*/}
      {/*  <div className="disciplines-page__add"></div>*/}
      {/*</div>*/}

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
};

export default DisciplinesPage;
