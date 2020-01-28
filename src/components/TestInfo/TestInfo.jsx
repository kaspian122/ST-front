import React, { useState } from 'react';
import { List } from 'antd';
import { useRouteMatch } from 'react-router';
import RouterPaths from '../../constants/routerPaths';
import { useDidMount } from '../../utils/hooks';
import Api from '../../services/api/api';

function TestInfo() {
  const { params } = useRouteMatch(RouterPaths.testPage);
  const [test, setTest] = useState({});

  useDidMount(() => {
    Api.getTest(params.id).then(response => {
      setTest(response);
    });
  });

  return (
    <div className="test-info">
      <h1>Тесты на проверку</h1>
      <List
        size="large"
        header={<div>Header</div>}
        bordered
        dataSource={test.questions}
        renderItem={item => (
          <div
            key={`${item.id}-${item.theme.id}`}
            onClick={() => console.log('wr')}
          >{`Тема: ${item.theme.name}  Вопрос: ${item.name}`}</div>
        )}
      />
    </div>
  );
}

export default TestInfo;
