import React, { useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useDidMount } from '../../utils/hooks';
import RouterPaths from '../../constants/routerPaths';
import './ErrorPage.scss';
import TitleContext from '../../utils/titleContext';

function ErrorPage() {
  const history = useHistory();
  const { setTitle } = useContext(TitleContext);

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
