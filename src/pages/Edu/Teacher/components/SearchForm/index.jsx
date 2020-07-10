import React from "react";
import { Form, Input, Button, Select, Row, Col } from "antd";

import { DownOutlined } from "@ant-design/icons";

import DatePicker from "@comps/DatePicker";
import "./index.less";

const { Option } = Select;
const { RangePicker } = DatePicker;

const layoutCol = {
  // <576px
  xs: 24,
  // ≥576px
  sm: 12,
  // ≥768px
  md: 12,
  // ≥992px
  lg: 8,
  // ≥1200px
  xl: 8,
  // ≥1600px
  xxl: 6,
};

function SearchForm({ getTeacherList, limit, updateSearchValues }) {
  const [form] = Form.useForm();

  const resetForm = () => {
    form.resetFields();
  };

  const searchUserList = (values) => {
    const { name, level, time } = values;
    const gmtCreateBegin = time[0].toISOString();
    const gmtCreateEnd = time[1].toISOString();
    const data = { name, level, gmtCreateBegin, gmtCreateEnd };
    getTeacherList({ ...data, page: 1, limit });
    updateSearchValues(data);
  };

  return (
    <div className="search-form">
      <Form layout="inline" form={form} onFinish={searchUserList}>
        <Row gutter={[10, 20]} className="search-form-row">
          <Col {...layoutCol}>
            <Form.Item name="name" label="讲师名称">
              <Input placeholder="讲师名称" />
            </Form.Item>
          </Col>
          <Col {...layoutCol}>
            <Form.Item name="level" label="讲师级别">
              <Select placeholder="讲师级别">
                <Option value={1}>高级讲师</Option>
                <Option value={2}>首席讲师</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col {...layoutCol}>
            <Form.Item name="time" label="创建时间">
              <RangePicker />
            </Form.Item>
          </Col>
          <Col {...layoutCol}>
            <Form.Item>
              <div>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button onClick={resetForm} className="search-form-btn">
                  重置
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default SearchForm;
