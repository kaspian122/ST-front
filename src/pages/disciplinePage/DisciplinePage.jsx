import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch, useHistory } from 'react-router';
import RouterPaths from '../../constants/routerPaths';
import Api from '../../services/api/api';
import { useSelector } from 'react-redux';
import { useDidMount, useSearchString } from '../../utils/hooks';
import BadgeList from '../../components/badgeList';
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import './DisciplinePage.scss';

const { TabPane } = Tabs;

function DisciplinePage({ setTitle = () => {} }) {
  const [themes, setThemes] = useState([]);
  const { params } = useRouteMatch(RouterPaths.discipline);
  const discipline = useSelector(state =>
    state.disciplines.find(it => String(it.id) === params.id)
  );

  useEffect(() => {
    setTitle(discipline?.name);
  }, [setTitle, discipline]);
  useDidMount(() => {
    Api.getThemes(params.id).then(response => {
      setThemes(response);
    });
  });
  const handleThemeClick = useCallback(item => {
    console.log(item);
  }, []);

  return (
    <div className="discipline-page">
      <Tabs defaultActiveKey="themes">
        <TabPane tab="Тесты" key="tests">
          xyu
        </TabPane>
        <TabPane tab="Темы" key="themes">
          <BadgeList items={themes} keyMap={{ title: 'name' }} onClick={handleThemeClick} />
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
