import React, { useEffect } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { Link } from "react-router-dom";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { reqUserData } from "@api/acl/user";

import { connect } from "react-redux";
import { addUser, updateUser } from "../../redux";

const layoutCol = {
  wrapperCol: { md: { span: 5 }, sm: { span: 10 }, xs: { span: 24 } },
  labelCol: { sm: { span: 2 }, xs: { span: 24 } },
};

function AddOrUpdateUser(props) {
  const onFinish = (values) => {
    const {
      location: { pathname },
      history,
      match: { params },
      addUser,
      updateUser,
    } = props;
    const isAddUser = pathname === "/acl/user/add";

    let reqPromise = null;

    if (isAddUser) {
      reqPromise = addUser(values);
    } else {
      reqPromise = updateUser({ ...values, id: params.id });
    }

    reqPromise.then(() => {
      message.success(`${isAddUser ? "添加" : "更新"}用户成功！`);
      history.push("/acl/user/list");
    });
  };

  useEffect(() => {
    const {
      location: { pathname },
      match: { params },
    } = props;

    if (pathname !== "/acl/user/add") {
      reqUserData(params.id).then((response) => {
        form.setFieldsValue(response);
      });
    }
  }, []);

  const {
    location: { pathname },
  } = props;

  const isAddUser = pathname === "/acl/user/add";

  const title = isAddUser ? "添加用户" : "更新用户";

  const [form] = Form.useForm();

  return (
    <Card
      title={
        <>
          <Link to="/acl/user/list">
            <ArrowLeftOutlined className="goback" />
          </Link>
          <span>{title}</span>
        </>
      }
    >
      <Form onFinish={onFinish} {...layoutCol} form={form}>
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item
          label="昵称"
          name="nickName"
          rules={[{ required: true, message: "请输入昵称!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            sm: { offset: 3, span: 1 },
            xs: { offset: 0, span: 24 },
          }}
        >
          <Button type="primary" htmlType="submit" className="user-form-btn">
            {isAddUser ? "添加" : "更新"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default connect(null, { addUser, updateUser })(AddOrUpdateUser);
