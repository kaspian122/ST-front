import { DisciplinesActionTypes } from '../actions/disciplinesActions';

const defaultState = [
  {
    id: 4444,
    name: 'lololowka',
    description: 'jopa jopa',
    count_test: 25,
  },
];

export default function disciplinesReducer(state = defaultState, action) {
  switch (action.type) {
    case DisciplinesActionTypes.SET_DATA: {
      return action.payload;
    }
    default:
      return state;
  }
}
