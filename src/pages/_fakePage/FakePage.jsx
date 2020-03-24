import './FakePage.scss';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Checkbox } from 'antd';
import CheckboxGroup from 'antd/es/checkbox/Group';
import Button from '../../components/button';
import { ReactComponent as ArrowSVG } from '../../static/images/svg/arrow.svg';
import { useDidMount } from '../../utils/hooks';
import TestsActions from '../../store/actions/testsActions';

function FakePage() {
  const dispatch = useDispatch();

  const [openGroup, setOpenGroup] = useState();

  // const groups = useSelector(state => state.tests.groups);
  const groups = [
    {
      number: '457-2',
      students: [
        'Беляев Матвей Артёмович',
        'Блажевич Игорь Юрьевич',
        'Валиева Руфина Рафаэлевна',
        'Возвышаев Александр Андреевич',
        'Гриненко Алексей Алексеевич',
        'Жигляев Родион Алексеевич',
        'Журавлева Анастасия Сергеевна',
        'Зиборов Кирилл Викторович',
        'Колосов Дмитрий Григорьевич',
        'Красных Алексей Владимирович',
        'Кузнецов Иван Анатольевич',
        'Юсупов Феликс Ренатович',
        'Юшкина Екатерина Алексеевна',
      ],
    },
    {
      number: '487-3',
      students: [
        'Беляев Матвей Артёмович',
        'Блажевич Игорь Юрьевич',
        'Валиева Руфина Рафаэлевна',
        'Возвышаев Александр Андреевич',
        'Гриненко Алексей Алексеевич',
        'Жигляев Родион Алексеевич',
        'Журавлева Анастасия Сергеевна',
        'Зиборов Кирилл Викторович',
        'Колосов Дмитрий Григорьевич',
        'Красных Алексей Владимирович',
        'Кузнецов Иван Анатольевич',
        'Юсупов Феликс Ренатович',
        'Юшкина Екатерина Алексеевна',
      ],
    },
    {
      number: '257-1',
      students: [
        'Беляев Матвей Артёмович',
        'Блажевич Игорь Юрьевич',
        'Валиева Руфина Рафаэлевна',
        'Возвышаев Александр Андреевич',
        'Гриненко Алексей Алексеевич',
        'Жигляев Родион Алексеевич',
        'Журавлева Анастасия Сергеевна',
        'Зиборов Кирилл Викторович',
        'Колосов Дмитрий Григорьевич',
        'Красных Алексей Владимирович',
        'Кузнецов Иван Анатольевич',
        'Юсупов Феликс Ренатович',
        'Юшкина Екатерина Алексеевна',
      ],
    },
    {
      number: '567-4',
      students: [
        'Беляев Матвей Артёмович',
        'Блажевич Игорь Юрьевич',
        'Валиева Руфина Рафаэлевна',
        'Возвышаев Александр Андреевич',
        'Гриненко Алексей Алексеевич',
        'Жигляев Родион Алексеевич',
        'Журавлева Анастасия Сергеевна',
        'Зиборов Кирилл Викторович',
        'Колосов Дмитрий Григорьевич',
        'Красных Алексей Владимирович',
        'Кузнецов Иван Анатольевич',
        'Юсупов Феликс Ренатович',
        'Юшкина Екатерина Алексеевна',
      ],
    },
  ];

  useDidMount(() => {
    dispatch(TestsActions.setGroups());
  });

  const handleArrowClick = number => {
    if (number === openGroup) setOpenGroup(null);
    else {
      setOpenGroup(number);
    }
  };

  function DropdownList(props) {
    const [studentCheck, setStudentCheck] = useState({
      checkedList: [],
      indeterminate: true,
      checkAll: false,
    });

    const onChange = checkedList => {
      setStudentCheck({
        checkedList,
        indeterminate: !!checkedList.length && checkedList.length < props.students.length,
        checkAll: checkedList.length === props.students.length,
      });
    };

    const onCheckAllChange = e => {
      setStudentCheck({
        checkedList: e.target.checked ? props.students : [],
        indeterminate: false,
        checkAll: e.target.checked,
      });
    };

    return (
      <div className="dropdown-list">
        <div className="dropdown-list__group">
          <Checkbox
            indeterminate={studentCheck.indeterminate}
            onChange={onCheckAllChange}
            checked={studentCheck.checkAll}
          >
            Выбрать всех
          </Checkbox>
          <div className="dropdown-list__student">
            <CheckboxGroup
              options={props.students}
              value={studentCheck.checkedList}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="groups-modal">
      <div className="groups-modal__text">
        <p className="groups-modal__title">Назначение групп</p>
        <p className="groups-modal__description">
          Выберите группы и студентов, для которых предназначен тест
        </p>
      </div>
      <div className="groups-modal__groups">
        {groups.map(group => (
          <div>
            <div className="groups-modal__group">
              <p className="groups-modal__group-number">{group.number}</p>
              <ArrowSVG
                className="groups-modal__arrow"
                onClick={() => handleArrowClick(group.number)}
              />
            </div>
            {openGroup === group.number ? <DropdownList students={group.students} /> : null}
          </div>
        ))}
      </div>
      <div className="groups-modal__buttons">
        <div className="groups-modal__button">
          <Button type="button" secondary="true">
            Отмена
          </Button>
        </div>
        <div className="groups-modal__button">
          <Button className="groups-modal__button" type="button" secondary="true">
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FakePage;
