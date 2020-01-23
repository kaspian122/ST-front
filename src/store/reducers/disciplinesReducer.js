import { DisciplinesActionTypes } from '../actions/disciplinesActions';

const defaultState = [];

export default function disciplinesReducer(state = defaultState, action) {
  switch (action.type) {
    case DisciplinesActionTypes.SET_DATA: {
      return action.payload;
    }
    default:
      return state;
  }
}
