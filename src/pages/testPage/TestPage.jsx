import React, { useState } from 'react';
import { DatePicker, Input, Modal, Select, TimePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import TestsActions from '../../store/actions/testsActions';
import { useDidMount } from '../../utils/hooks';

import './TestPage.scss';
import Api from '../../services/api/api';
import AddThemeBlock from '../../components/addThemeBlock/AddThemeBlock';

const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

function TestPage(props) {
  const dispatch = useDispatch();
  const [formModel, setFormModel] = useState({ themes: [] });
  const [themes, setThemes] = useState([]);
  const disciplines = useSelector(state => state.disciplines);
  const groups = useSelector(state => state.tests.groups);

  const handleNameChange = event => setFormModel({ ...formModel, name: event.target.value });
  const handleDisciplineChange = value => {
    setFormModel({ ...formModel, discipline: value });
    Api.getThemes(value).then(response => {
      setThemes([...response]);
    });
  };
  const handleGroupsChange = value => setFormModel({ ...formModel, groups: value });
  const handleDateChange = (dates, dateStrings) =>
    setFormModel({ ...formModel, startDate: dateStrings[0], endDate: dateStrings[1] });
  const handleTimeChange = time => setFormModel({ ...formModel, duration: time });
  const handleTryCountChange = event =>
    setFormModel({ ...formModel, tryCount: event.target.value });
  const handleThemeChange = (themeId, newTheme) =>
    setFormModel({
      ...formModel,
      themes: formModel.themes.map(theme => (theme.id === themeId ? newTheme : theme)),
    });
  const handleNewThemeClick = () =>
    setFormModel({
      ...formModel,
      themes: [...formModel.themes, { count: 0 }],
    });

  useDidMount(() => {
    dispatch(TestsActions.setGroups());
    props.setTitle('Создание теста');
  });

  const renderThemesList = () => {
    const list = [];
    formModel.themes.forEach((theme, index) => {
      list.push(
        <AddThemeBlock onThemeChange={handleThemeChange} id={index} theme={theme} themes={themes} />
      );
    });
    list.push(
      <div className="test-page__theme" key="new">
        <div className="test-page__theme-name" onClick={handleNewThemeClick}>
          Новая тема
        </div>
      </div>
    );
    return list;
  };

  return (
    <div className="test-page">
      <div className="test-page__form">
        <div className="test-page__form-row">
          <section className="test-page__form-cell test-page__form-cell--big">
            <p className="test-page__label">Введите название теста</p>
            <Input
              value={formModel.name}
              onChange={handleNameChange}
              className="input test-page__input"
            />
          </section>
        </div>
        <div className="test-page__form-row">
          <section className="test-page__form-cell test-page__form-cell--big">
            <p className="test-page__label">Дисциплина</p>
            <Select
              showSearch
              value={formModel.discipline}
              style={{ width: '460px', height: '40px' }}
              placeholder="Не выбрано"
              optionFilterProp="children"
              onChange={handleDisciplineChange}
              className="input test-page__input"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {disciplines?.map(discipline => (
                <Option value={discipline.name}>{discipline.name}</Option>
              ))}
            </Select>
          </section>
          <section className="test-page__form-cell test-page__form-cell--big">
            <p className="test-page__label">Группы</p>
            <Select
              mode="multiple"
              value={formModel.groups}
              style={{ width: '460px', height: '40px' }}
              placeholder="Не выбрано"
              onChange={handleGroupsChange}
              className="input test-page__input"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {groups?.map(group => (
                <Option value={group.id} key={group.id}>
                  {group.number}
                </Option>
              ))}
            </Select>
          </section>
        </div>
        <div className="test-page__form-row">
          <section className="test-page__form-cell test-page__form-cell--big">
            <p className="test-page__label">Введите описание теста</p>
            <TextArea
              rows="4"
              value={formModel.name}
              onChange={handleNameChange}
              className="input test-page__input"
            />
          </section>
          <section className="test-page__form-cell test-page__form-cell--big">
            <p className="test-page__label">Крадкое руководство для прохождения теста</p>
            <TextArea
              rows="4"
              value={formModel.name}
              onChange={handleNameChange}
              className="input test-page__input"
            />
          </section>
        </div>
      </div>
      <div className="test-page__form-row">
        <section className="test-page__form-cell test-page__form-cell--small">
          <p className="test-page__label">Дата выполнения</p>
          <RangePicker
            format="YYYY-MM-DD"
            style={{ width: '300px' }}
            onChange={handleDateChange}
            placeholder="Дата не выбрана"
          />
        </section>
        <section className="test-page__form-cell test-page__form-cell--small">
          <p className="test-page__label">Временные ограничения</p>
          <TimePicker
            value={formModel.duration}
            style={{ width: '300px' }}
            onChange={handleTimeChange}
            placeholder="00:00:00"
          />
        </section>
        <section className="test-page__form-cell test-page__form-cell--small">
          <p className="test-page__label">Количесво попыток</p>
          <Input
            value={formModel.tryCount}
            onChange={handleTryCountChange}
            placeholder="-"
            className="input test-page__input"
          />
        </section>
      </div>
      <div className="test-page__form-row">
        <section>
          <p className="test-page__label">Наименование тем</p>
          {renderThemesList()}
        </section>
      </div>
    </div>
  );
}

TestPage.propTypes = {
  setTitle: PropTypes.func.isRequired,
};

export default TestPage;
