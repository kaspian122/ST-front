const userDataId = state => state.app.userData.id;

const userRole = state => state.app.user.role;

const chosenTariffId = state => state.app.chosenTariffId;

const chosenNumber = state => state.app.chosenNumber;

const headerHeight = state => state.app.dimensions.headerHeight;

const sign = state => state.app.sign;

const activeConnectionId = state => state.app.activeConnection.id;

const activeConnectionNumber = state => state.app.activeConnection.number;

const controlButtonsEnabled = state => state.app.controlButtonsEnabled;

const locale = state => state.app.locale;

const AppSelectors = {
  userDataId,
  userRole,
  chosenTariffId,
  chosenNumber,
  headerHeight,
  locale,
  sign,
  activeConnectionId,
  activeConnectionNumber,
  controlButtonsEnabled,
};

export default AppSelectors;
