import React, { useState } from 'react';

import Field from '../../components/field';
import Button from '../../components/button/Button';

import './RegistrationPage.scss';

function RegistrationPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginChange = event => setLogin(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);

  return (
    <div className="login-page">
      <h1 className="login-page__title">Система тестирования студентов</h1>
      <div className="registration-form">
        <div className="registration-form__header">
          <div className="registration-form__title">регистрация преподавателя</div>
        </div>
        <form className="registration-form__form">
          <div className="registration-form__fields-wrapper">
            <div className="registration-form__row">
              <div className="registration-form__field--short">
                <Field name="login" label="Фамилия" value={login} onChange={handleLoginChange} />
              </div>
              <div className="registration-form__field--short">
                <Field name="login" label="Имя" value={login} onChange={handleLoginChange} />
              </div>
            </div>
            <div className="registration-form__row"></div>
            <div className="registration-form__row"></div>
            <div className="registration-form__row"></div>
            <div className="registration-form__row"></div>
            <div className="registration-form__row"></div>

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
              <Button label="Вход" />
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

export default RegistrationPage;
