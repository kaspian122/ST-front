import React, { useContext } from 'react';
import DisciplineCreateForm from '../../components/forms/DisciplineForm/DisciplineCreateForm';
import TitleContext from '../../utils/titleContext';
import { useDidMount } from '../../utils/hooks';

function NewDisciplinePage() {
  const { setTitle } = useContext(TitleContext);

  useDidMount(() => {
    setTitle('Создание дисциплины');
  });

  return (
    <div className="add-theme">
      <div className="add-theme__title">
        <DisciplineCreateForm />
      </div>
    </div>
  );
}
export default NewDisciplinePage;
