import Api from '../../services/api/api';

const entity = 'TESTS';

export const TestsActionTypes = {
  SET_DATA: `${entity}.SET_DATA`,
};

const setData = groups => ({
  type: TestsActionTypes.SET_DATA,
  payload: groups,
});

const setGroups = () => dispatch => {
  Api.getGroups().then(groups => {
    dispatch(setData(groups));
  });
};

const TestsActions = { setData, setGroups };

export default TestsActions;
