import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import RouterPaths from '../../constants/routerPaths';
import Api from '../../services/api/api';
import Badge from '../../components/badge';

function DisciplinePage({ setTitle = () => {} }) {
  const [themes, setThemes] = useState([]);
  const [discipline, setDiscipline] = useState({});
  const { id } = useRouteMatch(RouterPaths.discipline).params;

  useEffect(() => {
    function getter() {
      return Api.getThemes(id);
    }
    getter().then(response => {
      setThemes(response);
      console.log(response);
    });
  }, [id]);
  return (
    <div>
      {themes.map(item => (
        <Badge title={item.name} />
      ))}
    </div>
  );
}

export default DisciplinePage;
