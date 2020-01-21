import './LoginPage.scss';
import React, { useState, useCallback } from 'react';
import Field from '../../components/field';
import { ReactComponent as LogoSVG } from '../../static/images/svg/logo.svg';
import Button from '../../components/button/Button';
import Api from '../../services/api/api';

function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginChange = useCallback(event => setLogin(event.target.value), []);
  const handlePasswordChange = useCallback(event => setPassword(event.target.value), []);
  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      Api.auth(login, password);
    },
    [login, password]
  );

  return (
    <div className="login-page">
      <h1 className="login-page__title">Система тестирования студентов</h1>
      <div className="login-form">
        <div className="login-form__header">
          <div className="login-form__logo">
            <LogoSVG />
          </div>
          <div className="login-form__title">Авторизация</div>
        </div>
        <form className="login-form__form" onSubmit={handleSubmit}>
          <div className="login-form__fields-wrapper">
            <div className="login-form__field">
              <Field
                className="login-form__field"
                name="login"
                label="Логин"
                value={login}
                onChange={handleLoginChange}
              />
            </div>
            <div className="login-form__field">
              <Field
                className="login-form__field"
                name="password"
                type="password"
                label="Пароль"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <div className="login-form__reset link">Забыли пароль?</div>
          <div className="login-form__reset-block"> </div>
          <div className="login-form__buttons-block">
            <div className="login-form__login-button">
              <Button type="submit" label="Вход" />
            </div>
            <div className="login-form__registration-button">
              <Button label="Реггистрация преподавателя" secondary />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
