const entity = 'APP';

export const AppActionTypes = {
  SELECT_LOCALE: `${entity}.SELECT_LOCALE`,
  SET_USER: `${entity}.SET_USER`,
};

const selectLocale = locale => ({
  type: AppActionTypes.SELECT_LOCALE,
  payload: locale,
});

const setUser = user => ({
  type: AppActionTypes.SET_USER,
  payload: user,
});

const AppActions = {
  selectLocale,
  setUser,
};

export default AppActions;
