import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { Tabs } from 'antd';

import { ReactComponent as PointerSVG } from '../../static/images/svg/marker.svg';
import './StudentDisciplinePage.scss';
import BadgeList from '../../components/badgeList';

import RouterPaths from '../../constants/routerPaths';
import Api from '../../services/api/api';

const { TabPane } = Tabs;

function StudentDisciplinePage({ setTitle = () => {} }) {
  const [studentDiscipline, setStudentDiscipline] = useState({});
  const { params } = useRouteMatch(RouterPaths.studentDiscipline);

  useEffect(() => {
    setTitle(studentDiscipline?.name);
  }, [setTitle, studentDiscipline]);

  useEffect(() => {
    Api.getStudentDisciplines(params.id).then(response => {
      setStudentDiscipline(response);
    });
  });

  return (
    <div className="student-discipline-page">
      <Tabs defaultActiveKey="self-test">
        <TabPane tab="Тесты" key="tests" disabled />
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
          {studentDiscipline.test_list && (
            <BadgeList
              className="student-discipline-page__disciplines"
              items={studentDiscipline.test_list}
              keyMap={{ title: 'name' }}
            />
          )}
          <button type="button" className="student-discipline-page__start-check">
            Начать самопроверку
          </button>
        </TabPane>
        <TabPane tab="Информация" key="info">
          <div className="student-discipline-page__discipline-description">
            <p className="student-discipline-page__label--blue">Описание дисциплины</p>
            <p>Дисциплина посвящена изучению великих законов физики</p>
            <p>Ссылки на литературу:</p>
            <p>
              «Jаnssens D. (2006) Hаbeas Cоrpus?: Pierre Mаnent and the Politics of Europe //
              Europеаn Jоurnal of Pоlitical Theоry. 2006. № 5. P. 171-190».
            </p>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default StudentDisciplinePage;
