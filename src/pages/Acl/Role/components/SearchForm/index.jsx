import React from "react";
import { Form, Input, Button } from "antd";

import "./index.less";

function SearchForm({ getRoleList, limit, updateSearchValues }) {
  const [form] = Form.useForm();

  const resetForm = () => {
    form.resetFields();
  };

  const searchUserList = (values) => {
    getRoleList({ ...values, page: 1, limit });
    updateSearchValues(values);
  };

  return (
    <div className="search-form">
      <Form layout="inline" form={form} onFinish={searchUserList}>
        <Form.Item name="roleName" label="角色名">
          <Input placeholder="角色名" className="search-form-item" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="search-form-btn">
            查询
          </Button>
          <Button onClick={resetForm}>重置</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SearchForm;
