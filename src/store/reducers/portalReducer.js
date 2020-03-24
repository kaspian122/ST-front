import { PortalActionTypes } from '../actions/portalsAction';

const defaultState = null;

export default function modalReducer(state = defaultState, action) {
  switch (action.type) {
    case PortalActionTypes.OPEN:
      return action.payload;
    case PortalActionTypes.CLOSE:
    case PortalActionTypes.RESET:
      return defaultState;
    default:
      return state;
  }
}
