import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'antd';
import { useHistory } from 'react-router-dom';

import RouterPaths from '../../constants/routerPaths';
import Api from '../../services/api/api';
import { useDidMount } from '../../utils/hooks';
import BadgeList from '../../components/badgeList';

import ModalActions from '../../store/actions/modalActions';
import { ModalTypes } from '../../constants/modalConstants';

const { TabPane } = Tabs;

function DisciplinePage({ setTitle = () => {} }) {
  const history = useHistory();
  const [discipline, setDiscipline] = useState({});
  const { params } = useRouteMatch(RouterPaths.discipline);
  const dispatch = useDispatch();
  const modalType = useSelector(state => state.modal?.type);

  useEffect(() => {
    setTitle(discipline?.name);
  }, [setTitle, discipline]);
  useEffect(() => {
    Api.getDiscipline(params.id).then(response => {
      setDiscipline(response);
    });
  }, [params.id, modalType]);
  useDidMount(() => {
    Api.getDiscipline(params.id).then(response => {
      setDiscipline(response);
    });
  });
  const handleThemeClick = useCallback(
    item => {
      dispatch(ModalActions.openModal(ModalTypes.EDIT_THEME, item));
    },
    [dispatch]
  );
  const handleTestClick = item => {
    history.push(`/test/${item.id}`);
  };
  const handleNewThemeClick = useCallback(() => {
    dispatch(ModalActions.openModal(ModalTypes.ADD_THEME));
  }, [dispatch]);
  const handleNewTestClick = useCallback(() => {
    dispatch(ModalActions.openModal(ModalTypes.ADD_TEST));
  }, [dispatch]);

  return (
    <div className="discipline-page">
      <Tabs defaultActiveKey="themes">
        <TabPane tab="Тесты" key="tests">
          {discipline.test_list && (
            <BadgeList
              items={discipline.test_list}
              keyMap={{ title: 'name' }}
              onClick={handleTestClick}
              onNewClick={handleNewTestClick}
              newText="Создать тест"
            />
          )}
        </TabPane>
        <TabPane tab="Темы" key="themes">
          {discipline.theme_list && (
            <BadgeList
              items={discipline.theme_list}
              keyMap={{ title: 'name' }}
              onClick={handleThemeClick}
              onNewClick={handleNewThemeClick}
              newText="Создать тему"
            />
          )}
        </TabPane>
        <TabPane tab="Журнал" key="journal">
          bla bla car
        </TabPane>
        <TabPane tab="Информация" key="info" disabled>
          xyu1
        </TabPane>
      </Tabs>
    </div>
  );
}

DisciplinePage.propTypes = {
  setTitle: PropTypes.func.isRequired,
};

export default DisciplinePage;
