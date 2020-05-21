import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import RouterPaths from '../../constants/routerPaths';
import { useDidMount } from '../../utils/hooks';
import Api from '../../services/api/api';
import TitleContext from '../../utils/titleContext';
import { ReactComponent as ArrowSVG } from '../../static/images/svg/arrow.svg';
import './TestInfo.scss';
import CssUtils from '../../utils/sassUtils';
import ModalActions from '../../store/actions/modalActions';
import { ModalTypes } from '../../constants/modalConstants';

function TestInfo() {
  const history = useHistory();
  const { params } = useRouteMatch(RouterPaths.testPage);
  const [test, setTest] = useState([]);
  const [theme, setTheme] = useState([]);
  const [group, setGroup] = useState([]);
  const [discipline, setDiscipline] = useState({});
  const { setTitle } = useContext(TitleContext);
  const modalType = useSelector(state => state.modal?.type);
  const [openInfo, setOpenInfo] = useState();
  const [openTest, setOpenTest] = useState();
  const { groups } = test;
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(discipline?.name);
  }, [setTitle, discipline]);

  useDidMount(() => {
    Api.getTest(params.id).then(response => {
      setTest(response);
    });
  });

  useDidMount(() => {
    Api.getGroups().then(response => {
      setGroup(response);
    });
  });

  useEffect(() => {
    Api.getDiscipline(params.id).then(response => {
      setDiscipline(response);
    });
  }, [params.id, modalType]);

  const handleEditTestClick = useCallback(() => {
    dispatch(ModalActions.openModal(ModalTypes.EDIT_TEST));
  }, [dispatch]);

  const handleInfoClick = number => {
    if (number === openInfo) {
      setOpenInfo(null);
    } else {
      setOpenInfo(number);
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
    correct.map(item => {
      if (id === item) {
        correctValue = true;
      }
      return false;
    });
    return correctValue;
  };

  const [solutionGroup, setSolutionGroup] = useState([]);

  const numberGroup = elem => {
    Api.getThemes(elem).then(response => {
      setSolutionGroup([...response]);
    });
    console.log(solutionGroup, 'group');
    return group.map(item => {
      return elem === item.id ? <span>{item.number}</span> : <span></span>;
    });
  };
  // const themes = [{ id: 1 }, { id: 2 }];
  //
  // const themeName = () => {
  //   return <span>{theme.name}</span>;
  // };
  // themeName(
  //   useDidMount(() => {
  //     Api.getTheme(1).then(response => {
  //       setTheme(response);
  //     });
  //   })
  // );
  //console.log(theme, 'theme');
  function DropdownQuestion(question) {
    if (question.question.type === 'SINGLE') {
      return (
        <div className="dropdown">
          <span>Тип вопроса: выбор одного правильного</span>{' '}
          {question.question.answers.map(item => (
            <div
              className={CssUtils.mergeModifiers('dropdown__question', {
                incorrect: correctAnswer(item.id, question.question.correct_answer),
              })}
            >
              {item.name}
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
          {question.question.answers.map(item => (
            <div
              className={CssUtils.mergeModifiers('dropdown__question', {
                incorrect: correctAnswerMultiple(item.id, question.question.correct_answer),
              })}
            >
              {item.name}
              <ArrowSVG
                className={CssUtils.mergeModifiers('dropdown__arrow', {
                  incorrect: correctAnswerMultiple(item.id, question.question.correct_answer),
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
          <span className="dropdown_text">Тип вопроса: ввод фразы</span>
          {question.question.answers.map(item => (
            <div
              className={CssUtils.mergeModifiers('dropdown__question', {
                incorrect: correctAnswerMultiple(item.id, question.question.correct_answer),
              })}
            >
              {item.name}
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
  const timeFormat = ms => {
    const sec = ms / 1000;

    const hours = (sec / 3600) % 24;
    const minutes = (sec / 60) % 60;
    const seconds = sec % 60;
    function num(val) {
      return Math.floor(val);
    }
    return `${num(hours)} ч. ${num(minutes)} м. ${num(seconds)} с.`;
  };
  const dateFormat = date => {
    const d = new Date(date);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

    return `${da}.${mo}.${ye}`;
  };

  function Dropdown(id) {
    if (id.id === '1') {
      return (
        <div className="dropdown">
          <div className="dropdown_content">
            <div className="dropdown_content__container">
              <h3> Описание теста</h3>
              <span>{test.duration}</span>
            </div>
            <div className="dropdown_content__container">
              <h3> Краткое руководство для прохождения теста (?)</h3>
              <span>{test.rules}</span>
            </div>
            <div className="dropdown_content__container">
              <div className="dropdown_content__container__time">
                {' '}
                <h3> Срок выполнения </h3>
                <span>{dateFormat(test.date_end)}</span>
              </div>
              <div className="dropdown_content__container__time">
                <h3> Временные ограничения</h3>
                <span>{timeFormat(test.duration * 1000)}</span>
              </div>
              <div className="dropdown_content__container__time">
                <h3> Число попыток</h3>
                <span>{test.try_count}</span>
              </div>
            </div>
            <div className="dropdown_content__container">
              <h3> Темы</h3>
              <div className="dropdown_content__container__theme">
                {test.content.questions.map(item => (
                  <span>{item.theme.name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (id.id === '2') {
      return (
        <div className="dropdown">
          <ol>
            {test.content.questions.map(item => (
              <div>
                <div
                  className={CssUtils.mergeModifiers('test-info__dropdown', {
                    incorrect: openTest === item.id,
                  })}
                  key={item.id}
                  onClick={() => handleTestsClick(item.id)}
                >
                  <span
                    className={CssUtils.mergeModifiers('test-info__dropdown_name', {
                      incorrect: openTest === item.id,
                    })}
                  >
                    <li>{item.name}</li>
                  </span>
                  <ArrowSVG
                    className={CssUtils.mergeModifiers('test-info__dropdown__arrow', {
                      incorrect: openTest === item.id,
                    })}
                  />
                </div>
                {openTest === item.id ? <DropdownQuestion question={item} /> : null}
              </div>
            ))}
          </ol>
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
    <div>
      <div className="test-info">
        <div className="test-info_main">
          <span className="test-info_main__title">{test.name}</span>
          <span className="test-info_main__button" onClick={handleEditTestClick}>
            Редактировать тест
          </span>
        </div>
        {console.log(test)}
        {content.map(item => (
          <div>
            <div
              className={CssUtils.mergeModifiers('test-info__dropdown', {
                incorrect: openInfo === item.id,
              })}
              key={item.id}
              onClick={() => handleInfoClick(item.id)}
            >
              <span
                className={CssUtils.mergeModifiers('test-info__dropdown_name', {
                  incorrect: openInfo === item.id,
                })}
              >
                {item.name}
              </span>
              <ArrowSVG
                className={CssUtils.mergeModifiers('test-info__dropdown__arrow', {
                  incorrect: openInfo === item.id,
                })}
              />
            </div>
            {openInfo === item.id ? <Dropdown id={item.id} /> : null}
          </div>
        ))}
        <span className="test-info__statistic">Статистика групп по тесту</span>
      </div>
      {!isEmpty(test) ? (
        groups.map(item => (
          <div className="test-info__dropdown">
            <span className="test-info__dropdown_name">{numberGroup(item)}</span>
            <ArrowSVG className="test-info__dropdown__arrow" />
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default TestInfo;
