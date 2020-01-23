import Api from '../../services/api/api';

const entity = 'DISCIPLINES';

export const DisciplinesActionTypes = {
  SET_DATA: `${entity}.SET_DATA`,
};

const setData = disciplines => ({
  type: DisciplinesActionTypes.SET_DATA,
  payload: disciplines,
});

const setDisciplines = () => dispatch => {
  Api.getDisciplines().then(disciplines => {
    dispatch(setData(disciplines));
  });
};

const DisciplinesActions = { setData, setDisciplines };

export default DisciplinesActions;
