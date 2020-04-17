import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDidMount } from '../../utils/hooks';
import RouterPaths from '../../constants/routerPaths';
import './ErrorPage.scss';

function ErrorPage({ setTitle = () => {} }) {
  const history = useHistory();
  useDidMount(() => {
    setTitle('');
  });
  const handleDisciplinesClick = useCallback(() => {
    history.push(RouterPaths.disciplines);
  }, [history]);
  return (
    <div className="error-page">
      <div className="error-page__text">
        <span className="error-page__text_title">404</span>
        <span>Страница не найдена</span>
      </div>
      <div className="error-page__button" onClick={handleDisciplinesClick}>
        Вернуться на главную(?)
      </div>
    </div>
  );
}

export default ErrorPage;
