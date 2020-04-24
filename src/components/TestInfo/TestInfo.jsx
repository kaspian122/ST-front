import React, { useContext, useEffect, useState } from 'react';
import { List } from 'antd';
import { useHistory, useRouteMatch } from 'react-router';
import { useSelector } from 'react-redux';
import RouterPaths from '../../constants/routerPaths';
import { useDidMount } from '../../utils/hooks';
import Api from '../../services/api/api';
import TitleContext from '../../utils/titleContext';
import { ReactComponent as ArrowSVG } from '../../static/images/svg/arrow.svg';
import './TestInfo.scss';
import CssUtils from '../../utils/sassUtils';

function TestInfo() {
  const history = useHistory();
  const { params } = useRouteMatch(RouterPaths.testPage);
  const [test, setTest] = useState({});

  useDidMount(() => {
    Api.getTest(params.id).then(response => {
      setTest(response);
    });
  });

  const { setTitle } = useContext(TitleContext);
  const [discipline, setDiscipline] = useState({});
  const modalType = useSelector(state => state.modal?.type);

  useEffect(() => {
    setTitle(discipline?.name);
  }, [setTitle, discipline]);
  const handleTestClick = id => () => history.push(`/test-solution/${id}`);

  useEffect(() => {
    Api.getDiscipline(params.id).then(response => {
      setDiscipline(response);
    });
  }, [params.id, modalType]);
  const [openInfo, setOpenInfo] = useState();
  const [openTest, setOpenTest] = useState();
  const [colorInfo, setColorInfo] = useState();
  const handleInfoClick = number => {
    if (number === openInfo) {
      setOpenInfo(null);
      setColorInfo(false);
    } else {
      setOpenInfo(number);
      // setColorInfo(true)
    }
  };
  const handleTestsClick = number => {
    if (number === openTest) setOpenTest(null);
    else {
      setOpenTest(number);
    }
  };

  const correctAnswer = (id, correct) => {
    if (id === correct) {
      return true;
    }
    return false;
  };
  const correctAnswerMultiple = (id, correct) => {
    let correctValue = false;
    correct.map(elem => {
      if (id === elem) {
        correctValue = true;
      }
      return false;
    });
    return correctValue;
  };

  function DropdownQuestion(question) {
    console.log(question);
    if (question.question.type === 'SINGLE') {
      return (
        <div className="dropdown">
          <span>Тип вопроса: выбор одного правильного</span>{' '}
          {question.question.answers.map(elem => (
            <div
              className={CssUtils.mergeModifiers('dropdown__question', {
                incorrect: correctAnswer(elem.id, question.question.correct_answer),
              })}
            >
              {elem.name}
              <ArrowSVG className="dropdown__arrow" />
            </div>
          ))}
        </div>
      );
    }
    if (question.question.type === 'MULTIPLE') {
      return (
        <div className="dropdown">
          <span>Тип вопроса: выбор нескольких правильных</span>
          {question.question.answers.map(elem => (
            <div
              className={CssUtils.mergeModifiers('dropdown__question', {
                incorrect: correctAnswerMultiple(elem.id, question.question.correct_answer),
              })}
            >
              {elem.name}
              <ArrowSVG
                className={CssUtils.mergeModifiers('dropdown__arrow', {
                  incorrect: correctAnswerMultiple(elem.id, question.question.correct_answer),
                })}
              />
            </div>
          ))}
        </div>
      );
    }
    if (question.question.type === 'INPUT_STRING') {
      return (
        <div className="dropdown">
          <span>Тип вопроса: ввод фразы</span>
          {question.question.answers.map(elem => (
            <div
              className={CssUtils.mergeModifiers('dropdown__question', {
                incorrect: correctAnswerMultiple(elem.id, question.question.correct_answer),
              })}
            >
              {elem.name}
            </div>
          ))}
        </div>
      );
    }
    if (question.question.type === 'INPUT_NUMBER') {
      return (
        <div className="dropdown">
          <span>Тип вопроса: ввод числа</span>
          <div className="dropdown__question dropdown__question--incorrect">
            {question.question.correct_answer}
          </div>
        </div>
      );
    }
    return <div className="dropdown">ret</div>;
  }

  function Dropdown(id) {
    setColorInfo(true);
    if (id.id === '1') {
      return (
        <div className="dropdown">
          <div className="dropdown_content">
            <div>
              <h3> Описание теста</h3>
              {test.duration}
            </div>
            <div>
              <h3> Краткое руководство для прохождения теста (?)</h3>
              {test.rules}
            </div>
            <div>
              <h3> Срок выполнения </h3>
              {test.date_end}
              <h3> Временные ограничения</h3>
              <h3> Число попыток</h3>
              {test.try_count}
            </div>
            <div>
              <h3> Темы</h3>
            </div>
          </div>
        </div>
      );
    }
    if (id.id === '2') {
      return (
        <div className="dropdown">
          {test.content.questions.map(g => (
            <div>
              <div
                className="test-info__dropdown"
                key={g.id}
                onClick={() => handleTestsClick(g.id)}
              >
                <span className="test-info__dropdown_name">
                  {g.id} {g.name}
                </span>
                <ArrowSVG className="test-info__dropdown__arrow" />
              </div>
              {openTest === g.id ? <DropdownQuestion question={g} /> : null}
            </div>
          ))}
        </div>
      );
    }
  }
  const content = [
    {
      id: '1',
      name: 'Информация о тесте',
    },
    {
      id: '2',
      name: 'Вопросы',
    },
  ];
  return (
    <div className="test-info">
      <span className="test-info__title">{test.name}</span>

      {content.map(g => (
        <div>
          {console.log(colorInfo)}
          <div
            className={CssUtils.mergeModifiers('test-info__dropdown', {
              incorrect: colorInfo,
            })}
            key={g.id}
            onClick={() => handleInfoClick(g.id)}
          >
            <span className="test-info__dropdown_name">{g.name}</span>
            <ArrowSVG className="test-info__dropdown__arrow" />
          </div>
          {openInfo === g.id ? <Dropdown id={g.id} /> : null}
        </div>
      ))}

      <List
        size="large"
        header={<div>Header</div>}
        bordered
        dataSource={test.need_check}
        renderItem={item => (
          <div key={item.id} onClick={handleTestClick(item.id)}>
            {item.title}
          </div>
        )}
      />
    </div>
  );
}

export default TestInfo;
