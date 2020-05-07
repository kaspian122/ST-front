import React, { useContext, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { useRouteMatch } from 'react-router';

import { ReactComponent as PointerSVG } from '../../static/images/svg/marker.svg';
import { ReactComponent as InfoSVG } from '../../static/images/svg/info.svg';

import Panel from '../../components/panel';
import BadgeList from '../../components/badgeList';

import './StudentDisciplinePage.scss';
import '../../scss/tabs.scss';
import TitleContext from '../../utils/titleContext';

import Api from '../../services/api/api';
import { useDidMount } from '../../utils/hooks';

import RouterPaths from '../../constants/routerPaths';

const { TabPane } = Tabs;

function StudentDisciplinePage() {
  // const history = useHistory();
  const [discipline, setDiscipline] = useState({});
  const { params } = useRouteMatch(RouterPaths.studentDiscipline);
  const { setTitle } = useContext(TitleContext);
  // const dispatch = useDispatch();

  useDidMount(() => {
    Api.getTestsForStudentByDiscipline(params.id).then(response => {
      setDiscipline(response);
    });
  });

  useEffect(() => {
    setTitle((discipline.discipline && discipline.discipline.name) || 'Дисциплины');
  }, [setTitle, discipline]);

  const icon = <InfoSVG />;
  return (
    <div className="student-discipline-page">
      <Tabs defaultActiveKey="tests">
        <TabPane tab="Тесты" key="tests">
          {discipline.testList?.length ? (
            discipline.testList.map(test => (
              <Panel
                key={test.id}
                title={test.name}
                status={test.status}
                date={test.date}
                score={test.score}
                icon={icon}
              />
            ))
          ) : (
            <p>Список тестов пуст</p>
          )}
        </TabPane>
        <TabPane tab="Самопроверка" key="self-test">
          <p className="student-discipline-page__label">
            Тест для проведения самопроверки, оценка не ставится
          </p>
          <div className="student-discipline-page__info-table">
            <p className="student-discipline-page__label--bold">Выберите разделы</p>
            <PointerSVG className="student-discipline-page__pointer" />
            <p className="student-discipline-page__label--white">
              Для каждого раздела будет сформировано по 10 вопросов
            </p>
          </div>
          <div className="student-discipline-page__self-test">
            {discipline.testList && (
              <BadgeList
                className="student-discipline-page__self-test"
                items={discipline.testList}
                keyMap={{ title: 'name' }}
              />
            )}
          </div>
          <button type="button" className="student-discipline-page__start-check">
            Начать самопроверку
          </button>
        </TabPane>
        <TabPane tab="Информация" key="info">
          <div className="student-discipline-page__discipline-description">
            <p className="student-discipline-page__label--blue">Описание дисциплины</p>
            <p>{discipline?.discipline?.description}</p>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default StudentDisciplinePage;
