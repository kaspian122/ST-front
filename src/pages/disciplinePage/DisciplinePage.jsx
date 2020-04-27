import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'antd';
import { useHistory } from 'react-router-dom';

import RouterPaths from '../../constants/routerPaths';
import Api from '../../services/api/api';
import { useDidMount } from '../../utils/hooks';
import BadgeList from '../../components/badgeList';

import './DisciplinePage.scss';
import '../../scss/tabs.scss';
import ModalActions from '../../store/actions/modalActions';
import { ModalTypes } from '../../constants/modalConstants';
import NewDisciplinePage from '../newDisciplinePage';
import TitleContext from '../../utils/titleContext';
import AppSelectors from '../../store/selectors/appSelectors';
import appConstants from '../../constants/appConstants';
import StudentDisciplinePage from '../studentDisciplinePage';
import Button from '../../components/button';

const { TabPane } = Tabs;

function DisciplinePageById() {
  const history = useHistory();
  const [discipline, setDiscipline] = useState({});
  const { params } = useRouteMatch(RouterPaths.discipline);
  const { setTitle } = useContext(TitleContext);

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

  const handleEditDisciplineClick = useCallback(() => {
    dispatch(ModalActions.openModal(ModalTypes.EDIT_DISCIPLINE));
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
        <TabPane tab="Журнал" key="journal" disabled>
          2
        </TabPane>
        <TabPane tab="Информация" key="info">
          <div className="discipline-page__row">
            <div className="discipline-page__row-item">
              <div className="discipline-page__discipline-description">
                <p className="discipline-page__label">Описание дисциплины</p>
                {discipline.description}
              </div>
            </div>
            <div className="discipline-page__row-item">
              <Button type="button" onClick={handleEditDisciplineClick} secondary>
                редактировать дисциплину
              </Button>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

const DisciplinePage = () => {
  const { params } = useRouteMatch(RouterPaths.discipline);
  const userRole = useSelector(AppSelectors.userRole);

  let Component;
  if (params.id === 'new') {
    Component = NewDisciplinePage;
  } else if (userRole === appConstants.roles.STUDENT) {
    Component = StudentDisciplinePage;
  } else {
    Component = DisciplinePageById;
  }

  return <Component />;
};

export default DisciplinePage;
