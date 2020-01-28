/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Select } from 'antd';
import RouterPaths from '../../constants/routerPaths';
import { useDidMount } from '../../utils/hooks';
import Api from '../../services/api/api';
import CssUtils from '../../utils/sassUtils';

import './TestSolution.scss';
import Button from '../button/Button';

const { Option } = Select;

function TestSolution() {
  const history = useHistory();
  const { params } = useRouteMatch(RouterPaths.testSolution);
  const [solution, setSolution] = useState([]);
  const [mark, setMark] = useState('');

  useDidMount(() => {
    Api.getSolution(params.id).then(response => {
      setSolution(response);
    });
  });

  const handleMarkChange = value => {
    setMark(value);
  };

  const handleSave = () => {
    Api.sendMark({ mark: Number(mark), solution_id: params.id }).then(() => history.goBack());
  };

  return (
    <div className="solution">
      {solution?.solution?.questions_with_answer.map(item => (
        <div
          className={CssUtils.mergeModifiers('solution__question', { correct: item.is_correct })}
        >
          <p>{item.question.name}</p>
          <div className="solution__answers">
            <div className="solution__answer solution__students-answer">
              <p>Ответ студента</p>
              {!item.answer && <p>НЕТ ОТВЕТА</p>}
              {!Array.isArray(item.answer) ? (
                <p>
                  {typeof item.answer === 'object' && item.answer !== null
                    ? item.answer.name
                    : item.answer}
                </p>
              ) : (
                item.answer.map(answer => <p>{answer.name}</p>)
              )}
            </div>
            <div className="solution__answer solution__correct-answer">
              <p>Верный ответ</p>
              {!Array.isArray(item.correct_answer) ? (
                <p>
                  {typeof item.correct_answer === 'object' && item.correct_answer !== null
                    ? item.correct_answer.name
                    : item.correct_answer}
                </p>
              ) : (
                item.correct_answer.map(answer => <p>{answer.name}</p>)
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="solution__mark-zone">
        <Select
          onChange={handleMarkChange}
          placeholder="Нет"
          style={{ 'min-width': '150px', 'margin-right': '500px' }}
        >
          <Option value={1}>1</Option>
          <Option value={2}>2</Option>
          <Option value={3}>3</Option>
          <Option value={4}>4</Option>
          <Option value={5}>5</Option>
        </Select>
        <Button onClick={handleSave}>Сохранить оценку</Button>
      </div>
    </div>
  );
}

export default TestSolution;
