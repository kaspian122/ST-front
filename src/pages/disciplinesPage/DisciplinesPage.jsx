import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { useDidMount } from '../../utils/hooks';
import DisciplinesActions from '../../store/actions/disciplinesActions';
import BadgeList from '../../components/badgeList';

import './DisciplinesPage.scss';

function DisciplinesPage({ setTitle = () => {} }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const disciplines = useSelector(state => state.disciplines);

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
