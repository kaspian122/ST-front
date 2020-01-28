import { TestsActionTypes } from '../actions/testsActions';

const defaultState = [];

export default function testsReducer(state = defaultState, action) {
  switch (action.type) {
    case TestsActionTypes.SET_DATA: {
      return { groups: action.payload };
    }
    default:
      return state;
  }
}
