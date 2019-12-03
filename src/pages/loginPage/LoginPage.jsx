import './LoginPage.scss';
import React, { useState } from 'react';
import Field from '../../components/field';
import { ReactComponent as LogoSVG } from '../../static/images/svg/logo.svg';

function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginChange = event => setLogin(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);

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
        <form className="login-form__form">
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
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
