import React, { Component, createRef } from "react";
import { Button, message, Tooltip, Modal, Typography } from "antd";
import {
  SettingOutlined,
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";

import Table from "@comps/Table";
import SearchForm from "./components/SearchForm";
import { getUserList, removeUser, batchRemoveUser } from "./redux";
import { filterPermissions } from "@utils/tools";

const { Text } = Typography;

@connect(
  (state) => ({
    userList: state.userList,
    permissionValueList: filterPermissions(
      state.user.permissionValueList,
      "user"
    ),
  }),
  { getUserList, removeUser, batchRemoveUser }
)
class User extends Component {
  state = {
    selectedRowKeys: [],
    tableLoading: false,
    page: 1, // 页数
    limit: 10, // 每页显示条数
    searchValues: {
      // 搜索值
      username: "",
      nickName: "",
    },
  };

  containerRef = createRef();

  updateSearchValues = (searchValues) => {
    this.setState({
      searchValues,
    });
  };

  showUpdateUser = (id) => {
    return () => {
      this.props.history.push("/acl/user/update/" + id);
    };
  };

  showAssignUser = (id) => {
    return () => {
      this.props.history.push("/acl/user/assign/" + id);
    };
  };

  batchRemoveUser = () => {
    const { selectedRowKeys } = this.state;

    Modal.confirm({
      title: (
        <span>
          你确认要删除 <Text type="danger">{selectedRowKeys.length}个</Text>{" "}
          用户数据吗？
        </span>
      ),
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        this.props.batchRemoveUser(selectedRowKeys).then(() => {
          message.success(`删除 ${selectedRowKeys.length}个 用户数据成功！`);
        });
      },
    });
  };

  removeUser = (user) => {
    return () => {
      Modal.confirm({
        title: (
          <span>
            你确认要删除 <Text type="danger">{user.username}</Text> 用户数据吗？
          </span>
        ),
        icon: <ExclamationCircleOutlined />,
        onOk: () => {
          this.props.removeUser(user._id).then(() => {
            message.success(`删除 ${user.username} 用户数据成功！`);
          });
        },
      });
    };
  };

  renderTableItem = (user) => {
    const { permissionValueList } = this.props;

    return (
      <div>
        {permissionValueList["user.assign"] && (
          <Tooltip title="分配角色">
            <Button onClick={this.showAssignUser(user._id)}>
              <SettingOutlined />
            </Button>
          </Tooltip>
        )}
        {permissionValueList["user.update"] && (
          <Tooltip title="更新用户">
            <Button
              type="primary"
              style={{ margin: "0 10px" }}
              onClick={this.showUpdateUser(user._id)}
            >
              <FormOutlined />
            </Button>
          </Tooltip>
        )}
        {permissionValueList["user.remove"] && (
          <Tooltip title="删除用户">
            <Button type="danger" onClick={this.removeUser(user)}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        )}
      </div>
    );
  };

  columns = [
    {
      title: "序号",
      dataIndex: "index",
    },
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "用户昵称",
      dataIndex: "nickName",
    },
    {
      title: "创建时间",
      dataIndex: "gmtCreate",
    },
    {
      title: "操作",
      width: 200,
      render: this.renderTableItem,
    },
  ];

  componentDidMount() {
    const { userList } = this.props;
    if (userList.items.length) return;

    const { page, limit } = this.state;
    this.handleTableChange(page, limit);
  }

  handleTableChange = (page, limit) => {
    this.setState({
      tableLoading: true,
    });
    const { username, nickName } = this.state.searchValues;

    this.getUserList({ page, limit, username, nickName }).finally(() => {
      this.setState({
        tableLoading: false,
        page,
        limit,
      });
    });
  };

  getUserList = ({ page, limit }) => {
    const { username, nickName } = this.state.searchValues;
    return this.props
      .getUserList({ page, limit, username, nickName })
      .then((total) => {
        if (total === 0) {
          message.warning("暂无用户列表数据");
          return;
        }
        message.success("获取用户列表数据成功");
      });
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  };

  showAddUser = () => {
    this.props.history.push("/acl/user/add");
  };

  handleExtraBtns = (permissionValueList) => {
    const extra = [];
    if (permissionValueList["user.add"]) {
      extra.push(
        <Button type="primary" key="0" onClick={this.showAddUser}>
          <PlusOutlined />
          <span>新增</span>
        </Button>
      );
    }

    if (permissionValueList["user.remove"]) {
      extra.push(
        <Button type="danger" key="1" onClick={this.batchRemoveUser}>
          <span>批量删除</span>
        </Button>
      );
    }

    return extra;
  };

  refresh = () => {
    const { page, limit } = this.state;
    this.getUserList({ page, limit }).then(() => {
      message.success("刷新数据成功！");
    });
  };

  render() {
    const { selectedRowKeys, tableLoading, page, limit } = this.state;

    const {
      userList: { items, total },
      permissionValueList,
      getUserList,
    } = this.props;

    const data = items.map((item, index) => {
      return {
        ...item,
        index: index + 1,
      };
    });

    const extra = this.handleExtraBtns(permissionValueList);

    return (
      <div ref={this.containerRef} style={{ backgroundColor: "#f5f5f5" }}>
        <SearchForm
          getUserList={getUserList}
          limit={limit}
          updateSearchValues={this.updateSearchValues}
        />
        <Table
          container={this.containerRef}
          onRefresh={this.refresh}
          title="用户数据列表"
          extra={extra}
          selectedRowKeys={selectedRowKeys}
          onSelectChange={this.onSelectChange}
          columns={this.columns}
          dataSource={data}
          rowKey="_id"
          pagination={{
            current: page,
            pageSize: limit,
            pageSizeOptions: ["5", "10", "20", "30", "40", "50", "100"],
            showQuickJumper: true,
            showSizeChanger: true,
            total,
            onChange: this.handleTableChange,
            onShowSizeChange: this.handleTableChange,
          }}
          loading={tableLoading}
        />
      </div>
    );
  }
}

export default User;
