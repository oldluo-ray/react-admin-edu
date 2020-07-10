import React, { Component } from "react";
import { Tree, Card, Button, message } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { getMenuList } from "../../../Permission/redux";
import { reqGetRoleMenu, reqAssignRoleMenu } from "@api/acl/permission";

import "./index.less";

@connect(
  (state) => ({
    menuList: state.menuList,
  }),
  {
    getMenuList,
  }
)
class AssignRole extends Component {
  state = {
    expandedKeys: [],
    treeData: [],
    checkedKeys: [],
  };

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
    });
  };

  onCheck = (checkedKeys) => {
    this.setState({
      checkedKeys,
    });
  };

  componentDidMount() {
    const {
      menuList,
      match: { params },
    } = this.props;

    const promises = [];

    promises.push(
      reqGetRoleMenu(params.id).then((res) => ({
        type: "permissionList",
        data: res,
      }))
    );

    if (!menuList.length) {
      promises.push(
        this.props
          .getMenuList()
          .then((res) => ({ type: "menuList", data: res }))
      );
    }

    Promise.all(promises).then((result) => {
      const data = {
        menuList,
      };

      result.forEach((item) => {
        data[item.type] = item.data;
      });

      this.setState({
        treeData: this.renderTreeData(data.menuList),
        expandedKeys: this.findExpandedKeys(data.menuList),
        checkedKeys:
          this.findCheckedKeys(data.menuList, data.permissionList) || [],
      });
    });
  }

  renderTreeData = (menus) => {
    return menus.map((menu) => {
      return {
        title: menu.name,
        key: menu._id,
        children: menu.children && this.renderTreeData(menu.children),
      };
    });
  };

  findExpandedKeys = (menus) => {
    menus = JSON.parse(JSON.stringify(menus));

    const expandedKeys = [];

    while (menus.length) {
      const menu = menus.shift();
      if (menu.children) {
        expandedKeys.push(menu._id);
        menus = menus.concat(menu.children);
      }
    }

    return expandedKeys;
  };

  findCheckedKeys = (menus, permissionList) => {
    menus = JSON.parse(JSON.stringify(menus));
    const checkedKeys = [];

    while (menus.length) {
      const menu = menus.shift();
      if (menu.children) {
        menus = menus.concat(menu.children);
      }

      for (let i = 0; i < permissionList.length; i++) {
        const permissionItem = permissionList[i];
        if (permissionItem.children) {
          for (let j = 0; j < permissionItem.children.length; j++) {
            const item = permissionItem.children[j];
            if (item.path) {
              if (menu.name === item.name) {
                checkedKeys.push(menu._id);
              }
            } else {
              console.log(menu, item);
            }
          }
        } else {
          if (menu.name === permissionItem.name) {
            checkedKeys.push(menu._id);
          }
        }
      }
    }

    return checkedKeys;
  };

  assignRole = () => {
    const { checkedKeys } = this.state;
    const { id } = this.props.match.params;
    reqAssignRoleMenu({ permissionId: checkedKeys.checked, roleId: id }).then(() => {
      message.success("分配角色权限成功");
      this.props.history.push("/acl/role/list");
    });
  };

  render() {
    const { expandedKeys, treeData, checkedKeys } = this.state;
    // const { permissionList } = this.props;

    return (
      <Card
        title={
          <>
            <Link to="/acl/role/list">
              <ArrowLeftOutlined className="goback" />
            </Link>
            <span>设置角色权限</span>
          </>
        }
      >
        <Tree
          checkable
          expandedKeys={expandedKeys}
          onExpand={this.onExpand}
          onCheck={this.onCheck}
          checkedKeys={checkedKeys}
          treeData={treeData}
          checkStrictly
        />
        <Button
          type="primary"
          className="assign-role-btn"
          onClick={this.assignRole}
        >
          确认
        </Button>
      </Card>
    );
  }
}

export default AssignRole;
