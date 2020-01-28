import React, { useState } from 'react';
import { List } from 'antd';
import { useHistory, useRouteMatch } from 'react-router';
import RouterPaths from '../../constants/routerPaths';
import { useDidMount } from '../../utils/hooks';
import Api from '../../services/api/api';

function TestInfo() {
  const history = useHistory();
  const { params } = useRouteMatch(RouterPaths.testPage);
  const [test, setTest] = useState({});

  useDidMount(() => {
    Api.getTest(params.id).then(response => {
      setTest(response);
    });
  });

  const handleTestClick = id => () => history.push(`/test-solution/${id}`);

  return (
    <div className="test-info">
      <h1>Тесты на проверку</h1>
      <List
        size="large"
        header={<div>Header</div>}
        bordered
        dataSource={test.need_check}
        renderItem={item => (
          <div key={item.id} onClick={handleTestClick(item.id)}>
            {item.title}
          </div>
        )}
      />
    </div>
  );
}

export default TestInfo;
