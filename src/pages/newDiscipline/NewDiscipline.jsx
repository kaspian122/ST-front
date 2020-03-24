import React from 'react';
import { useRouteMatch } from 'react-router';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import DisciplineCreateForm from '../../components/forms/DisciplineForm/DisciplineCreateForm';
import RouterPaths from '../../constants/routerPaths';

function NewDiscipline() {
  //const history = useHistory();
  //const { params } = useRouteMatch(RouterPaths.newdiscipline);
  // const dispatch = useDispatch();

  return (
    <div className="add-theme">
      <div className="add-theme__title">
        <DisciplineCreateForm />
      </div>
    </div>
  );
}
export default NewDiscipline;
