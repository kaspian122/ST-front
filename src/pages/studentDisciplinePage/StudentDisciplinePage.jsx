import React, { useEffect } from 'react';
import { Tabs } from 'antd';

import { ReactComponent as PointerSVG } from '../../static/images/svg/pointer.svg';
import './StudentDisciplinePage.scss';
import BadgeList from '../../components/badgeList';

const { TabPane } = Tabs;

function StudentDisciplinePage({ setTitle = () => {} }) {
  const discipline = {
    name: 'Физика',
    test_list: [
      { name: 'Термодинамика' },
      { name: 'Динамика' },
      { name: 'Термодинамика' },
      { name: 'Динамика' },
      { name: 'Термодинамика' },
      { name: 'Динамика' },
    ],
  };

  useEffect(() => {
    setTitle(discipline?.name);
  }, [setTitle, discipline]);

  return (
    <div className="student-discipline-page">
      <Tabs defaultActiveKey="self-test">
        <TabPane tab="Тесты" key="tests" disabled></TabPane>
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
          {discipline.test_list && (
            <BadgeList
              className="student-discipline-page__disciplines"
              items={discipline.test_list}
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
