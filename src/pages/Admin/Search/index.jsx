import React, { Component } from "react";
import { Row, Col, Card as AntdCard, Statistic, Table, Radio } from "antd";
import {
  EllipsisOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { Chart, Geom, Tooltip, Axis, Coord, Legend, Guide } from "bizcharts";
import DataSet from "@antv/data-set";

import Card from "@comps/Card";

import "./index.less";

export default class Search extends Component {
  state = {
    visits: [],
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        visits: [
          {
            year: "1986",
            ACME: 162,
          },
          {
            year: "1987",
            ACME: 134,
          },
          {
            year: "1988",
            ACME: 116,
          },
          {
            year: "1989",
            ACME: 122,
          },
          {
            year: "1990",
            ACME: 178,
          },
          {
            year: "1991",
            ACME: 144,
          },
          {
            year: "1992",
            ACME: 125,
          },
          {
            year: "1993",
            ACME: 176,
          },
          {
            year: "1994",
            ACME: 156,
          },
          {
            year: "1995",
            ACME: 195,
          },
          {
            year: "1996",
            ACME: 215,
          },
          {
            year: "1997",
            ACME: 176,
          },
          {
            year: "1998",
            ACME: 167,
          },
          {
            year: "1999",
            ACME: 142,
          },
          {
            year: "2000",
            ACME: 117,
          },
          {
            year: "2001",
            ACME: 113,
          },
          {
            year: "2002",
            ACME: 132,
          },
          {
            year: "2003",
            ACME: 146,
          },
          {
            year: "2004",
            ACME: 169,
          },
          {
            year: "2005",
            ACME: 184,
          },
        ],
      });
    }, 1000);
  }

  render() {
    const { visits } = this.state;

    const dv = new DataSet.View().source(visits);

    dv.transform({
      type: "fold",
      fields: ["ACME"], // 展示的key
      // key: "type",
      // value: "value"
    });

    const scale = {
      value: {
        alias: "访问量",
      },
      year: {
        range: [0, 1],
      },
    };

    const columns = [
      {
        title: "排名",
        dataIndex: "sort",
      },
      {
        title: "搜索关键字",
        dataIndex: "keyword",
      },
      {
        title: "用户数",
        dataIndex: "count",
        sorter: (a, b) => a.count - b.count,
      },
      {
        title: "周涨幅",
        dataIndex: "week",
        render: (week) => {
          return (
            <span>
              <span>{week.number}%</span>
              <span>
                {week.direct === "up" ? (
                  <CaretUpOutlined
                    style={{ color: "#cf1322", marginLeft: 10 }}
                  />
                ) : (
                  <CaretDownOutlined
                    style={{ color: "#3f8600", marginLeft: 10 }}
                  />
                )}
              </span>
            </span>
          );
        },
        sorter: (a, b) => a.week.number - b.week.number,
      },
    ];

    const tableData = [];

    for (let i = 0; i < 50; i++) {
      tableData.push({
        sort: i + 1,
        keyword: "搜索关键词-" + i,
        count: Math.round(Math.random() * 800 + 200),
        week: {
          number: Math.round(Math.random() * 200),
          direct: Math.round(Math.random() * 1) > 0 ? "up" : "down",
        },
        key: i,
      });
    }

    const { DataView } = DataSet;
    const { Html } = Guide;
    const data = [
      {
        item: "事例一",
        count: 40,
        money: 1000,
      },
      {
        item: "事例二",
        count: 21,
        money: 3000,
      },
      {
        item: "事例三",
        count: 17,
        money: 2000,
      },
      {
        item: "事例四",
        count: 13,
        money: 4000,
      },
      {
        item: "事例五",
        count: 9,
        money: 5000,
      },
    ];
    const dv2 = new DataView();

    dv2.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent",
    });

    const cols = {
      percent: {
        formatter: (val) => {
          val = val * 100 + "%";
          return val;
        },
      },
    };

    return (
      <div className="search">
        <Row gutter={20}>
          <Col span={12}>
            <AntdCard title="线上热门搜索" extra={<EllipsisOutlined />}>
              <Row justify="space-between">
                <Col span={11}>
                  <Card title={<Statistic title="搜索用户数" value={123321} />}>
                    <Chart
                      data={dv}
                      padding={["auto", "auto", 0, "auto"]}
                      forceFit={true}
                      scale={scale}
                      height={50}
                    >
                      <Tooltip showTitle={false} crosshairs />
                      <Geom
                        type="area"
                        position="year*value"
                        color="#1DA57A"
                        shape="smooth"
                      />
                    </Chart>
                  </Card>
                </Col>
                <Col span={11}>
                  <Card title={<Statistic title="人均搜索次数" value={2.7} />}>
                    <Chart
                      data={dv}
                      padding={["auto", "auto", 0, "auto"]}
                      forceFit={true}
                      scale={scale}
                      height={50}
                    >
                      <Tooltip showTitle={false} crosshairs />
                      <Geom
                        type="area"
                        position="year*value"
                        color="#1DA57A"
                        shape="smooth"
                      />
                    </Chart>
                  </Card>
                </Col>
              </Row>
              <Table
                columns={columns}
                dataSource={tableData}
                pagination={{
                  size: "small",
                  defaultPageSize: 5,
                }}
              />
            </AntdCard>
          </Col>
          <Col span={12}>
            <AntdCard
              title="销售额类别占比"
              extra={
                <Radio.Group value={"全部渠道"}>
                  <Radio.Button value="全部渠道">全部渠道</Radio.Button>
                  <Radio.Button value="线上">线上</Radio.Button>
                  <Radio.Button value="门店">门店</Radio.Button>
                </Radio.Group>
              }
            >
              <Chart
                height={518}
                data={dv2}
                scale={cols}
                padding={[80, 100, 80, -200]}
                forceFit
              >
                <Coord type={"theta"} radius={0.75} innerRadius={0.74} />
                <Axis name="percent" />
                <Legend
                  useHtml={true}
                  position="right-center"
                  itemTpl={(value, color, checked, index) => {
                    const obj = dv2.rows[index];
                    checked = checked ? "checked" : "unChecked";
                    return (
                      '<tr class="g2-legend-list-item item-' +
                      index +
                      " " +
                      checked +
                      '" data-value="' +
                      value +
                      '" data-color=' +
                      color +
                      ' style="cursor: pointer;font-size: 14px">' +
                      '<td style="border: none;padding:0;"><i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;background-color:' +
                      color +
                      ';"></i>' +
                      '<span class="g2-legend-text">' +
                      value +
                      "</span></td>" +
                      '<td style="text-align: right;border: none;padding:0;">' +
                      obj.percent +
                      "%</td><td>￥" +
                      obj.money +
                      "</td>" +
                      "</tr>"
                    );
                  }}
                  g2-legend={{
                    width: "200px",
                    left: "50%",
                    top: "50%",
                  }}
                  g2-legend-list-item={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                />
                <Tooltip
                  showTitle={false}
                  itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                />
                <Guide>
                  <Html
                    position={["50%", "50%"]}
                    html='<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">销售额<br><span style="color:#262626;font-size:2.5em">￥12200</span></div>'
                    alignX="middle"
                    alignY="middle"
                  />
                </Guide>
                <Geom
                  type="intervalStack"
                  position="percent"
                  color="item"
                  style={{
                    lineWidth: 4,
                    stroke: "#fff",
                  }}
                ></Geom>
              </Chart>
            </AntdCard>
          </Col>
        </Row>
      </div>
    );
  }
}
