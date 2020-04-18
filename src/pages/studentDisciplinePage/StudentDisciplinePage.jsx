import React, { useContext, useEffect } from 'react';
import { Tabs } from 'antd';

import { ReactComponent as PointerSVG } from '../../static/images/svg/marker.svg';
import { ReactComponent as InfoSVG } from '../../static/images/svg/info.svg';

import Panel from '../../components/panel';
import BadgeList from '../../components/badgeList';

import './StudentDisciplinePage.scss';
import '../../scss/tabs.scss';
import TitleContext from '../../utils/titleContext';
const { TabPane } = Tabs;

function StudentDisciplinePage() {
  const studentDiscipline = {
    id: 0,
    name: 'Физика',
    test_list: [
      {
        id: 0,
        name: 'Термодинамика',
        status: 'available',
        date: '01.01.2020',
        score: '4',
        questions: 25,
        time: 20,
        attempts: 2,
      },
      {
        id: 1,
        name: 'Динамика',
        status: 'completed',
        date: '01.01.2020',
        score: '4',
        questions: 25,
        time: 20,
        attempts: 2,
      },
      {
        id: 2,
        name: 'Термодинамика',
        status: 'available',
        date: '01.01.2020',
        score: '4',
        questions: 25,
        time: 20,
        attempts: 2,
      },
      {
        id: 3,
        name: 'Динамика',
        status: 'closed',
        date: '01.01.2020',
        score: '4',
        questions: 25,
        time: 20,
        attempts: 2,
      },
      {
        id: 4,
        name: 'Термодинамика',
        status: 'completed',
        date: '01.01.2020',
        score: '4',
        questions: 25,
        time: 20,
        attempts: 2,
      },
      {
        id: 5,
        name: 'Динамика',
        status: 'closed',
        date: '01.01.2020',
        score: '4',
        questions: 25,
        time: 20,
        attempts: 2,
      },
      {
        id: 6,
        name: 'Термодинамика',
        status: 'completed',
        date: '01.01.2020',
        score: 'На проверке',
        questions: 25,
        time: 20,
        attempts: 2,
      },
    ],
  };

  const { setTitle } = useContext(TitleContext);

  // const [studentDiscipline, setStudentDiscipline] = useState({});
  // const { params } = useRouteMatch(RouterPaths.studentDiscipline);
  // const modalType = useSelector(state => state.modal?.type);

  useEffect(() => {
    setTitle(studentDiscipline.name);
  }, [setTitle, studentDiscipline]);

  // useEffect(() => {
  //   Api.getStudentDiscipline(params.id).then(response => {
  //     setStudentDiscipline(response);
  //   });
  // }, [params.id, modalType]);

  const icon = <InfoSVG />;
  return (
    <div className="student-discipline-page">
      <Tabs defaultActiveKey="tests">
        <TabPane tab="Тесты" key="tests">
          {studentDiscipline.test_list.map(test => (
            <Panel
              key={test.id}
              title={test.name}
              status={test.status}
              date={test.date}
              score={test.score}
              icon={icon}
            ></Panel>
          ))}
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
            {studentDiscipline.test_list && (
              <BadgeList
                className="student-discipline-page__self-test"
                items={studentDiscipline.test_list}
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
