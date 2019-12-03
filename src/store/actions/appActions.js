const entity = 'APP';

export const AppActionTypes = {
  SELECT_LOCALE: `${entity}.SELECT_LOCALE`,
};

const selectLocale = locale => ({
  type: AppActionTypes.SELECT_LOCALE,
  payload: locale,
});

const AppActions = {
  selectLocale,
};

export default AppActions;
