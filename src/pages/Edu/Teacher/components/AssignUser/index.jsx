import React, { useState, useEffect } from "react";
import { Form, Radio, Button, message, Card } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { reqGetUserRole, reqAssignUserRole } from "@api/acl/user";

import "./index.less";

function AssignUser(props) {
  const [role, setRole] = useState(null);
  const [roleList, setRoleList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const {
      match: { params },
    } = props;

    reqGetUserRole(params.id).then((res) => {
      const role = res.assignRoles;
      form.setFieldsValue({
        roleId: role ? role._id : "",
      });
      setRole(role || {});
      setRoleList(res.allRolesList);
    });
  }, []);

  const onFinish = (values) => {
    const { roleId } = values;
    if (roleId === role._id) {
      form.setFields([{ name: "roleId", errors: ["不能分配同一个角色~"] }]);
      return;
    }
    const {
      match: { params },
      history,
    } = props;
    reqAssignUserRole(params.id, roleId).then(() => {
      message.success("分配角色权限成功~");
      history.push("/acl/user/list");
    });
  };

  return (
    <Card
      title={
        <span>
          <Link to="/acl/user/list">
            <ArrowLeftOutlined className="goback" />
          </Link>
          请分配角色
        </span>
      }
    >
      <Form form={form} onFinish={onFinish} hideRequiredMark={true}>
        <Form.Item
          name="roleId"
          labelCol={{ span: 24 }}
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <ul className="radio-wrap">
              {roleList.map((item) => {
                return (
                  <li className="radio-item" key={item._id}>
                    <Radio value={item._id}>{item.roleName}</Radio>
                  </li>
                );
              })}
            </ul>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="assign-user-btn">
            确定
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default AssignUser;
