import React, { Component } from "react";
import { Tabs, Row, Col } from "antd";
import dayjs from "dayjs";
import { Chart, Geom, Axis, Tooltip } from "bizcharts";

import DatePicker from "@comps/DatePicker";

import "./index.less";

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

export default class Monitor extends Component {
  state = {
    picker: "date",
    pickerValue: [dayjs(), dayjs()],
  };

  selectPicker = (picker) => {
    return (e) => {
      const pickerValue = [];

      switch (picker) {
        case "date":
          pickerValue.push(dayjs());
          pickerValue.push(dayjs());
          break;
        case "week":
          pickerValue.push(dayjs().startOf("week"));
          pickerValue.push(dayjs().endOf("week"));
          break;
        case "month":
          pickerValue.push(dayjs().startOf("month"));
          pickerValue.push(dayjs().endOf("month"));
          break;
        case "year":
        default:
          pickerValue.push(dayjs().startOf("year"));
          pickerValue.push(dayjs().endOf("year"));
          break;
      }

      this.setState({
        picker,
        pickerValue,
      });
    };
  };

  render() {
    const { pickerValue, picker } = this.state;

    const operations = (
      <div>
        <span
          className={"date-text " + (picker === "date" ? "active" : "")}
          onClick={this.selectPicker("date")}
        >
          今日
        </span>
        <span
          className={"date-text " + (picker === "week" ? "active" : "")}
          onClick={this.selectPicker("week")}
        >
          本周
        </span>
        <span
          className={"date-text " + (picker === "month" ? "active" : "")}
          onClick={this.selectPicker("month")}
        >
          本月
        </span>
        <span
          className={"date-text " + (picker === "year" ? "active" : "")}
          onClick={this.selectPicker("year")}
        >
          全年
        </span>
        <RangePicker picker="date" value={pickerValue} />
      </div>
    );

    const data = [
      {
        month: "1月",
        sales: 38,
      },
      {
        month: "2月",
        sales: 52,
      },
      {
        month: "3月",
        sales: 61,
      },
      {
        month: "4月",
        sales: 145,
      },
      {
        month: "5月",
        sales: 148,
      },
      {
        month: "6月",
        sales: 160,
      },
      {
        month: "7月",
        sales: 111,
      },
      {
        month: "8月",
        sales: 133,
      },
      {
        month: "9月",
        sales: 122,
      },
      {
        month: "10月",
        sales: 158,
      },
      {
        month: "11月",
        sales: 79,
      },
      {
        month: "12月",
        sales: 88,
      },
    ];

    const factory = [
      {
        key: 0,
        title: "工专路 0 号店",
        money: 323234,
      },
      {
        key: 1,
        title: "工专路 1 号店",
        money: 323234,
      },
      {
        key: 2,
        title: "工专路 2 号店",
        money: 323234,
      },
      {
        key: 3,
        title: "工专路 3 号店",
        money: 323234,
      },
      {
        key: 4,
        title: "工专路 4 号店",
        money: 323234,
      },
      {
        key: 5,
        title: "工专路 5 号店",
        money: 323234,
      },
      {
        key: 6,
        title: "工专路 6 号店",
        money: 323234,
      },
    ];

    return (
      <div className="monitor-wrap">
        <Tabs
          defaultActiveKey="1"
          tabBarExtraContent={operations}
          // onChange={callback}
        >
          <TabPane tab="销售量" key="1">
            <Row justify="space-between">
              <Col span={16}>
                <Chart
                  height={350}
                  data={data}
                  forceFit
                  style={{ marginLeft: -40, marginBottom: -50 }}
                >
                  <h3 className="main-title" style={{ marginLeft: 50 }}>
                    销售业绩
                  </h3>
                  <Axis name="month" />
                  <Axis name="sales" />
                  <Tooltip
                    crosshairs={{
                      type: "y",
                    }}
                  />
                  <Geom type="interval" position="month*sales" />
                </Chart>
              </Col>
              <Col span={7}>
                <div className="factory">
                  <h3>销售额排名</h3>
                  <ul>
                    {factory.map((item) => {
                      return (
                        <li key={item.key}>
                          <span className="factory-key">{item.key}</span>
                          <span>{item.title}</span>
                          <span className="factory-money">{item.money}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="访问量" key="2">
            <Row justify="space-between">
              <Col span={16}>
                <Chart
                  height={350}
                  data={data}
                  forceFit
                  style={{ marginLeft: -40, marginBottom: -50 }}
                >
                  <h3 className="main-title" style={{ marginLeft: 50 }}>
                    销售业绩
                  </h3>
                  <Axis name="month" />
                  <Axis name="sales" />
                  <Tooltip
                    crosshairs={{
                      type: "y",
                    }}
                  />
                  <Geom type="interval" position="month*sales" />
                </Chart>
              </Col>
              <Col span={7}>
                <div className="factory">
                  <h3>销售额排名</h3>
                  <ul>
                    {factory.map((item) => {
                      return (
                        <li key={item.key}>
                          <span class="factory-key">{item.key}</span>
                          <span>{item.title}</span>
                          <span class="factory-money">{item.money}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
