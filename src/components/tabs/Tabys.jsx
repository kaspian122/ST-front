import React from 'react';
import { useHistory, useParams } from 'react-router';
import { useSearchString } from '../../utils/hooks';

import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

function Tabys({ children }) {
  const history = useHistory();
  const searchObj = useSearchString();
  console.log(searchObj);
  React.Children.forEach(children, child => {
    console.log(child);
  });
  return (
    <div className="tabs">
      <Tabs
        defaultActiveKey="2"
        onChange={key => {}}
        renderTabBar={() => <ScrollableInkTabBar />}
        renderTabContent={() => <TabContent />}
      >
        <TabPane tab="tab 1" key="1">
          frst
        </TabPane>
        <TabPane tab="tab 2" key="2">
          frstsdfsdf
        </TabPane>
        <TabPane tab="tab 3" key="3">
          fr23123123st
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Tabys;
