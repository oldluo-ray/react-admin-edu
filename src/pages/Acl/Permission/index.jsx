import React, { Component } from "react";
import {
  Table,
  Button,
  Modal,
  Tooltip,
  Input,
  message,
  Typography,
  Select,
} from "antd";
import {
  DownOutlined,
  RightOutlined,
  FormOutlined,
  DeleteOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import { connect } from "react-redux";
import { getMenuList, addMenu, updateMenu, removeMenu } from "./redux";

import AddMenu from "./components/AddMenu";

import icons from "@conf/icons";

const iconsKeys = Object.keys(icons);
const iconsValues = Object.values(icons);

const { Text } = Typography;
const { Option } = Select;

@connect((state) => ({ menuList: state.menuList }), {
  getMenuList,
  addMenu,
  updateMenu,
  removeMenu,
})
class Permission extends Component {
  state = {
    expandedRowKeys: [],
    isShowAddMenu: false,
    parentMenu: {},
    updateMenu: null,
  };

  removeMenu = (menu) => {
    return () => {
      Modal.confirm({
        title: (
          <span>
            你确认要删除 <Text type="danger">{menu.name}</Text> 菜单数据吗？
          </span>
        ),
        icon: <ExclamationCircleOutlined />,
        onOk: () => {
          this.props.removeMenu(menu._id).then(() => {
            message.success("删除菜单成功");
          });
        },
      });
    };
  };

  renderTableItem = (item) => {
    const btns = [
      <Tooltip title="添加子菜单" key="0">
        <Button
          type="primary"
          style={{ marginRight: 10 }}
          onClick={this.showAddMenu(item)}
        >
          <PlusOutlined />
        </Button>
      </Tooltip>,
      <Tooltip title="更新菜单" key="1">
        <Button
          type="primary"
          style={{ marginRight: 10 }}
          onClick={this.showUpdateMenu(item)}
        >
          <FormOutlined />
        </Button>
      </Tooltip>,
      <Tooltip title="删除菜单" key="2">
        <Button type="danger" onClick={this.removeMenu(item)}>
          <DeleteOutlined />
        </Button>
      </Tooltip>,
    ];

    if (item.name === "全部数据") {
      btns.splice(1, 2);
    } else if (item.type === 2) {
      btns.splice(0, 1);
    }

    return <div>{btns}</div>;
  };

  cancelUpdateMenu = () => {
    this.setState({
      updateMenu: null,
    });
  };

  showUpdateMenu = (updateMenu) => {
    return () => {
      this.setState({
        updateMenu,
      });
    };
  };

  // 显示菜单
  showAddMenu = (item) => {
    return () => {
      this.setState({
        parentMenu: item,
        isShowAddMenu: true,
      });
    };
  };

  onExpandedRowsChange = (expandedRowKeys) => {
    this.setState({
      expandedRowKeys,
    });
  };

  componentDidMount() {
    this.props.getMenuList().then((menus) => {
      this.setState({
        expandedRowKeys: [menus[0] && menus[0]._id],
      });
    });
  }

  hidden = (key) => {
    return () => {
      this.setState({
        [key]: false,
      });
    };
  };

  handleInputChange = (key, isSelect) => {
    return (e) => {
      const { updateMenu } = this.state;
      this.setState({
        updateMenu: {
          ...updateMenu,
          [key]: isSelect ? e : e.target.value,
        },
      });
    };
  };

  updateMenu = () => {
    const { updateMenu } = this.state;
    this.props.updateMenu({ ...updateMenu, children: null }).then(() => {
      message.success("更新菜单成功");
      this.setState({
        updateMenu: null,
      });
    });
  };

  render() {
    const { menuList, addMenu } = this.props;
    const {
      expandedRowKeys,
      isShowAddMenu,
      parentMenu,
      updateMenu,
    } = this.state;

    const columns = [
      {
        title: "名称",
        // dataIndex: "name",
        render: (item) => {
          if (updateMenu && item._id === updateMenu._id) {
            return (
              <Input
                style={{ width: "70%", marginLeft: 10 }}
                defaultValue={item.name}
                onChange={this.handleInputChange("name")}
              />
            );
          }
          return <span style={{ marginLeft: 10 }}>{item.name}</span>;
        },
      },
      {
        title: "访问路径",
        // dataIndex: "path",
        render: (item) => {
          if (updateMenu && item._id === updateMenu._id) {
            return (
              <Input
                defaultValue={item.path}
                onChange={this.handleInputChange("path")}
              />
            );
          }
          return <span>{item.path}</span>;
        },
      },
      {
        title: "图标",
        width: 200,
        // dataIndex: "path",
        render: (item) => {
          if (updateMenu && item._id === updateMenu._id) {
            return (
              <Select
                style={{ width: 200 }}
                defaultValue={item.icon}
                onChange={this.handleInputChange("icon", true)}
              >
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
            );
          }

          if (item.icon) {
            const Icon = icons[item.icon];
            return <Icon />;
          }

          return null;
        },
      },
      {
        title: "组件",
        // dataIndex: "component",
        render: (item) => {
          if (updateMenu && item._id === updateMenu._id) {
            return (
              <Input
                defaultValue={item.component}
                onChange={this.handleInputChange("component")}
              />
            );
          }
          return <span>{item.component}</span>;
        },
      },
      {
        title: "权限值",
        // dataIndex: "permissionValue",
        render: (item) => {
          if (updateMenu && item._id === updateMenu._id) {
            return (
              <Input
                defaultValue={item.permissionValue}
                onChange={this.handleInputChange("permissionValue")}
              />
            );
          }
          return <span>{item.permissionValue}</span>;
        },
      },
      {
        title: "操作",
        width: 200,
        render: (item) => {
          if (updateMenu && item._id === updateMenu._id) {
            return (
              <div>
                <Button
                  type="primary"
                  style={{ marginRight: 10 }}
                  onClick={this.updateMenu}
                >
                  确认
                </Button>
                <Button onClick={this.cancelUpdateMenu}>取消</Button>
              </div>
            );
          }
          return this.renderTableItem(item);
        },
      },
    ];

    return (
      <div>
        <Table
          columns={columns}
          dataSource={menuList}
          rowKey="_id"
          pagination={{ hideOnSinglePage: true }}
          expandable={{
            expandIcon: ({ expanded, onExpand, record }) => {
              // 没有子元素不显示图标
              if (!record.children) return null;
              return expanded ? (
                <DownOutlined onClick={(e) => onExpand(record, e)} />
              ) : (
                <RightOutlined onClick={(e) => onExpand(record, e)} />
              );
            },
            expandedRowKeys,
            onExpandedRowsChange: this.onExpandedRowsChange,
          }}
        />

        <Modal
          title={parentMenu.level < 3 ? "添加菜单" : "添加按钮"}
          visible={isShowAddMenu}
          footer={null}
          // onOk={this.addMenu}
          // onCancel={this.hidden("isShowAddMenu")}
        >
          <AddMenu
            hidden={this.hidden("isShowAddMenu")}
            parentMenu={parentMenu}
            addMenu={addMenu}
          />
        </Modal>
      </div>
    );
  }
}

export default Permission;
