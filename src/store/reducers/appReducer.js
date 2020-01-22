import { AppActionTypes } from '../actions/appActions';
import Languages from '../../constants/languages';

const defaultState = {
  locale: Languages.RU,
  user: {},
};

export default function appReducer(state = defaultState, action) {
  switch (action.type) {
    case AppActionTypes.SELECT_LOCALE: {
      return {
        ...state,
        locale: action.payload,
      };
    }
    case AppActionTypes.SET_USER: {
      return { ...state, user: action.payload };
    }
    default:
      return state;
  }
}
