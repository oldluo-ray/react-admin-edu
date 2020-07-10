import React, { useEffect } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { Link } from "react-router-dom";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { reqRoleData } from "@api/acl/role";

import { connect } from "react-redux";
import { addRole, updateRole } from "../../redux";

const layoutCol = {
  wrapperCol: { md: { span: 5 }, sm: { span: 10 }, xs: { span: 24 } },
  labelCol: { sm: { span: 2 }, xs: { span: 24 } },
};

function AddOrUpdateRole(props) {
  const onFinish = (values) => {
    const {
      location: { pathname },
      history,
      match: { params },
      addRole,
      updateRole,
    } = props;
    const isAddRole = pathname === "/acl/role/add";

    let reqPromise = null;

    if (isAddRole) {
      reqPromise = addRole(values);
    } else {
      reqPromise = updateRole({ ...values, id: params.id });
    }

    reqPromise.then(() => {
      message.success(`${isAddRole ? "添加" : "更新"}角色成功！`);
      history.push("/acl/role/list");
    });
  };

  useEffect(() => {
    const {
      location: { pathname },
      match: { params },
    } = props;

    if (pathname !== "/acl/role/add") {
      reqRoleData(params.id).then((response) => {
        form.setFieldsValue(response);
      });
    }
  }, []);

  const {
    location: { pathname },
  } = props;

  const isAddRole = pathname === "/acl/role/add";

  const title = isAddRole ? "添加角色" : "更新角色";

  const [form] = Form.useForm();

  return (
    <Card
      title={
        <>
          <Link to="/acl/role/list">
            <ArrowLeftOutlined className="goback" />
          </Link>
          <span>{title}</span>
        </>
      }
    >
      <Form onFinish={onFinish} {...layoutCol} form={form}>
        <Form.Item
          label="角色名"
          name="roleName"
          rules={[{ required: true, message: "请输入角色名!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="昵称"
          name="remark"
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
            {isAddRole ? "添加" : "更新"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default connect(null, { addRole, updateRole })(AddOrUpdateRole);
