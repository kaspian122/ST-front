import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDidMount } from '../../utils/hooks';
import './errorPage.scss';
function ErrorPage({ setTitle = () => {} }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const disciplines = useSelector(state => state.disciplines);
  useDidMount(() => {
    setTitle('');
  });
  const handleDisciplinesClick = useCallback(() => {
    history.push(`/disciplines`);
  }, [history]);
  return (
    <div className="error-page">
      <div className="error-page__text">
        <span className="error-page__text_title">404</span>
        <span>Страница не найдена</span>
      </div>
      <div className="error-page__button" onClick={handleDisciplinesClick}>
        Вернуться на главную(?){' '}
      </div>
    </div>
  );
}

export default ErrorPage;
