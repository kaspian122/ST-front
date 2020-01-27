import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'antd';

import RouterPaths from '../../constants/routerPaths';
import Api from '../../services/api/api';
import { useDidMount } from '../../utils/hooks';
import BadgeList from '../../components/badgeList';

import './DisciplinePage.scss';
import ModalActions from '../../store/actions/modalActions';
import { ModalTypes } from '../../constants/modalConstants';

const { TabPane } = Tabs;

function DisciplinePage({ setTitle = () => {} }) {
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
  const handleThemeClick = useCallback(() => {}, []);
  const handleNewThemeClick = useCallback(() => {
    dispatch(ModalActions.openModal(ModalTypes.ADD_THEME));
  }, [dispatch]);

  return (
    <div className="discipline-page">
      <Tabs defaultActiveKey="themes">
        <TabPane tab="Тесты" key="tests">
          xyu
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
        <TabPane tab="Журнал" key="journal" disabled>
          2
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
