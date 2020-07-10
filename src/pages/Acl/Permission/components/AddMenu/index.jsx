import React from "react";
import { Form, Input, Select, Button } from "antd";

import icons from "@conf/icons";
import "./index.less";

const { Item } = Form;
const { Option } = Select;

const iconsKeys = Object.keys(icons);
const iconsValues = Object.values(icons);

function AddMenuForm({ hidden, parentMenu, addMenu }) {
  const [form] = Form.useForm();

  const cancel = () => {
    form.resetFields();
    hidden();
  };

  const isMenu = parentMenu.level < 3;

  const onFinish = (values) => {
    const menu = {
      ...values,
      pid: parentMenu._id,
      type: isMenu ? 1 : 2,
      level: parentMenu.level + 1,
    };

    addMenu(menu).then(cancel);
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      onFinish={onFinish}
      form={form}
    >
      <Item
        label="菜单名称"
        name="name"
        rules={[{ required: true, message: "请输入菜单名称" }]}
      >
        <Input />
      </Item>
      <Item
        label="访问路径"
        name="path"
        rules={isMenu ? [{ required: true, message: "请输入访问路径" }] : null}
      >
        <Input />
      </Item>
      <Item label="组件路径" name="component">
        <Input />
      </Item>
      {isMenu ? (
        <Item label="菜单图标" wrapperCol={{ span: 10 }} name="icon">
          <Select>
            {iconsKeys.map((iconKey, index) => {
              const Icon = iconsValues[index];
              return (
                <Option value={iconKey} key={index}>
                  <span className="icons-option">
                    <span>{iconKey}</span> &nbsp;&nbsp;
                    <Icon />
                  </span>
                </Option>
              );
            })}
          </Select>
        </Item>
      ) : (
        <Item
          label="按钮权限"
          name="permissionValue"
          rules={[{ required: true, message: "请输入按钮权限" }]}
        >
          <Input />
        </Item>
      )}
      <Item wrapperCol={{ span: 22 }}>
        <div className="add-menu-btn-wrap">
          <Button className="cancel-btn" onClick={cancel}>
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            确认
          </Button>
        </div>
      </Item>
    </Form>
  );
}

export default AddMenuForm;
