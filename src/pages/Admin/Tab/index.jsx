import React, { Component } from "react";
import { Row, Col } from "antd";
import { Chart, Axis, Coord, Geom } from "bizcharts";
import DataSet from "@antv/data-set";

import "./index.less";

export default class Tab extends Component {
  render() {
    const { title, percent } = this.props.data;

    const { DataView } = DataSet;
    const data = [
      {
        item: "1",
        data: true,
        count: percent
      },
      {
        item: "2",
        data: false,
        count: 100 - percent
      }
    ];
    const dv = new DataView();

    dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });

    return (
      <div className="tab">
        <Row>
          <Col span={12}>
            <div className="tab-title">{title}</div>
            <div>
              <span className="tab-text">转化率</span>
              <span className="tab-percent">{percent}%</span>
            </div>
          </Col>
          <Col span={12}>
            <div className="tab-chart">
              <Chart height={50} width={50} data={dv} padding={[0, 0, 0, 0]}>
                <Coord type={"theta"} radius={0.7} innerRadius={0.65} />
                <Axis name="percent" />
                <Geom
                  type="intervalStack"
                  position="percent"
                  color={[
                    "data",
                    data => {
                      if (data) return "#1da57a";
                      else return "#F2F4F6";
                    }
                  ]}
                />
              </Chart>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
