import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useParams, useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '../../components/button/Button';
import DisciplineCreateForm from '../../components/forms/DisciplineForm/DisciplineCreateForm';
import RouterPaths from '../../constants/routerPaths';

function NewDiscipline() {
  const history = useHistory();
  const { params } = useRouteMatch(RouterPaths.newdiscipline);
  const dispatch = useDispatch();

  return (
    <div className="add-theme">
      <div className="add-theme__title">
        <DisciplineCreateForm />
      </div>
    </div>
  );
}
export default NewDiscipline;
