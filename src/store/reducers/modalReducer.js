import { ModalActionTypes } from '../actions/modalActions';

const defaultState = null;

export default function modalReducer(state = defaultState, action) {
  switch (action.type) {
    case ModalActionTypes.OPEN:
      return action.payload;
    case ModalActionTypes.CLOSE:
    case ModalActionTypes.RESET:
      return defaultState;
    default:
      return state;
  }
}
