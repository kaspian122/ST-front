import React, { useEffect, useState } from 'react';
import Api from '../../services/api/api';

import './DisciplinesPage.scss';
import { Link } from 'react-router-dom';
import Badge from '../../components/badge';

function DisciplinesPage({ setTitle = () => {} }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    function getter() {
      return Api.getDisciplines();
    }
    getter().then(response => {
      setData(response);
    });

    setTitle('Дисциплины');
  }, [setTitle]);

  return (
    <div className="disciplines-page">
      {/*<div className="disciplines-page__actions">*/}

      {/*  <div className="disciplines-page__search"></div>*/}
      {/*  <div className="disciplines-page__add"></div>*/}
      {/*</div>*/}

      <div className="disciplines-page__disciplines">
        {data.map(item => (
          <Link to={`/disciplines/${item.id}`}>
            <Badge title={item.name} info={item.description} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DisciplinesPage;
