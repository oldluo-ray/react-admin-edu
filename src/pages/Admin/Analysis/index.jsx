import React, { Component } from "react";

import { Row, Col, Statistic, Progress } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

import Card from "@comps/Card";
import Visits from "./Visits";
import Bar from "./Bar";

const firstRowCol = {
  xs: { span: 24 },
  md: { span: 12 },
  lg: { span: 6 },
};

export default class Analysis extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 2000);
  }

  render() {
    const { loading } = this.state;

    return (
      <Row gutter={24}>
        <Col {...firstRowCol}>
          <Card
            title={<Statistic title="总销售额" prefix="￥" value={112893} />}
            footer={<span>日销售额 ￥12,423</span>}
            loading={loading}
          >
            <span>
              周同比 12% <CaretUpOutlined style={{ color: "#cf1322" }} />
            </span>
            <span style={{ marginLeft: 15 }}>
              日同比 10% <CaretDownOutlined style={{ color: "#3f8600" }} />
            </span>
          </Card>
        </Col>
        <Col {...firstRowCol}>
          <Card
            title={<Statistic title="访问量" value={22222} />}
            footer={<span>日销售额 ￥12,423</span>}
            loading={loading}
          >
            <Visits />
          </Card>
        </Col>
        <Col {...firstRowCol}>
          <Card
            title={<Statistic title="支付笔数" value={33333} />}
            footer={<span>转化率60%</span>}
            loading={loading}
          >
            <Bar />
          </Card>
        </Col>
        <Col {...firstRowCol}>
          <Card
            title={<Statistic title="运营结果" value={44444} />}
            footer={
              <span>
                <span>
                  周同比 12% <CaretUpOutlined style={{ color: "#cf1322" }} />
                </span>
                <span style={{ marginLeft: 15 }}>
                  日同比 10% <CaretDownOutlined style={{ color: "#3f8600" }} />
                </span>
              </span>
            }
            loading={loading}
          >
            <Progress
              strokeColor={{
                from: "#108ee9",
                to: "#87d068",
              }}
              percent={80.9}
              status="active"
            />
          </Card>
        </Col>
      </Row>
    );
  }
}
