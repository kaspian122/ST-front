import React, { useCallback, useState } from 'react';
import { Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import './DisciplineCreateForm.scss';
import Button from '../../button';
import CssUtils from '../../../utils/sassUtils';
import Api from '../../../services/api/api';
import ModalActions from '../../../store/actions/modalActions';
import { useDidMount } from '../../../utils/hooks';
import RouterPaths from '../../../constants/routerPaths';

const { TextArea } = Input;
const { Option } = Select;

function DisciplineCreateForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { params } = useRouteMatch(RouterPaths.newdiscipline);
  const [form, setForm] = useState({
    name: '',
    description: '',
    semester: '',
  });
  const INIsemesters = [
    {
      name: 'Осенний семестр 2019/2020',
      id: 24436,
    },
  ];
  const [semesters, setSemesters] = useState(INIsemesters);
  const handleSaveClick = () => {
    Api.createDiscipline(form).then(() => history.push('/disciplines'));
  };

  useDidMount(() => {
    Api.getSemester(params.id).then(response => {
      console.log('respo');
      setSemesters(response);
    });
  });

  const [formData, setFormData] = useState({
    corTitle: false,
    corDescription: false,
    corSelect: false,
  });

  const setFormValue = name => event => {
    const value = event.target ? event.target.value : event;
    setForm({ ...form, [name]: value });
  };

  const validateForm = name => event => {
    const value = event && event.target ? event.target.value : event;
    console.log(event);
    setFormData({ ...formData, [name]: isEmpty(value) });
  };

  return (
    <div className="discipline-form">
      <div className="discipline-form__info">
        <div className="discipline-form__info-label">Ведите название дисциплины</div>
        <div className="discipline-form__info-box">
          <Input
            className={CssUtils.mergeModifiers('discipline-form__info-box-input', {
              incorrect: formData.corTitle,
            })}
            onChange={setFormValue('name')}
            onBlur={validateForm('corTitle')}
          />
          <Select
            onSelect={setFormValue('semester')}
            onBlur={validateForm('corSelect')}
            className={CssUtils.mergeModifiers('discipline-form__info-box-select', {
              incorrect: formData.corSelect,
            })}
            placeholder="Выберете семстр"
          >
            {semesters.map(item => (
              <Option
                className="discipline-form__info-box-select-variant"
                value={item}
                key={item.id}
              >
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
        <div className="discipline-form__description">
          <div className="discipline-form__description-label">
            Введиете описание дисциплины / ссылки на литературу
          </div>
          <TextArea
            className={CssUtils.mergeModifiers('discipline-form__description-text', {
              incorrect: formData.corDescription,
            })}
            onChange={setFormValue('description')}
            onBlur={validateForm('corDescription')}
          />
        </div>
      </div>
      <Button onClick={handleSaveClick}>Сохранить</Button>
    </div>
  );
}

DisciplineCreateForm.propTypes = {};

export default DisciplineCreateForm;
