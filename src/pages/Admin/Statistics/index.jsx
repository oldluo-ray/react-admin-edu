import React, { Component } from "react";
import { Tabs } from "antd";

import Tab from "../Tab";
import Line from "../Line";

import "./index.less";

const { TabPane } = Tabs;

export default class Statistics extends Component {
  render() {
    const data = [];

    for (let i = 0; i < 20; i++) {
      data.push({
        title: "Stores" + (i + 1),
        percent: Math.round(Math.random() * 8 + 1) * 10
      });
    }

    return (
      <div className="statistics">
        <Tabs defaultActiveKey="1" tabPosition="top">
          {data.map((item, i) => (
            <TabPane tab={<Tab data={item} />} key={i}>
              <Line />
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}
