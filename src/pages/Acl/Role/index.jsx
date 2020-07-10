import React, { Component, createRef } from "react";
import { Button, message, Tooltip, Modal, Typography } from "antd";
import {
  FormOutlined,
  DeleteOutlined,
  PlusOutlined,
  SettingOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import { connect } from "react-redux";
import { getRoleList, removeRole, batchRemoveRole } from "./redux";

import Table from "@comps/Table";
import SearchForm from "./components/SearchForm";
import { filterPermissions } from "@utils/tools";

const { Text } = Typography;

@connect(
  (state) => ({
    roleList: state.roleList,
    permissionValueList: filterPermissions(
      state.user.permissionValueList,
      "role"
    ),
  }),
  { getRoleList, removeRole, batchRemoveRole }
)
class Role extends Component {
  state = {
    tableLoading: false,
    selectedRowKeys: [],
    searchValues: { roleName: "" },
    page: 1, // 页数
    limit: 10, // 每页显示条数
    role: null, // 设置/更新/删除的role
  };

  containerRef = createRef();

  // 设置角色权限
  showAssignRole = (id) => {
    return () => {
      this.props.history.push("/acl/role/assign/" + id);
    };
  };

  batchRemoveRole = () => {
    const { selectedRowKeys } = this.state;

    Modal.confirm({
      title: (
        <span>
          你确认要删除 <Text type="danger">{selectedRowKeys.length}个</Text>
          角色数据吗？
        </span>
      ),
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        this.props.batchRemoveRole(selectedRowKeys).then(() => {
          message.success(`删除 ${selectedRowKeys.length}个 角色数据成功！`);
        });
      },
    });
  };

  // 删除角色
  removeRole = (role) => {
    return () => {
      Modal.confirm({
        title: (
          <span>
            你确认要删除 <Text type="danger">{role.roleName}</Text> 角色数据吗？
          </span>
        ),
        icon: <ExclamationCircleOutlined />,
        onOk: () => {
          this.props.removeRole(role._id).then(() => {
            message.success(`删除 ${role.roleName} 角色数据成功！`);
          });
        },
      });
    };
  };

  showUpdateRole = (id) => {
    return () => {
      this.props.history.push("/acl/role/update/" + id);
    };
  };

  renderTableItem = (role) => {
    const { permissionValueList } = this.props;

    return (
      <div>
        {permissionValueList["role.assign"] && (
          <Tooltip title="设置角色权限">
            <Button onClick={this.showAssignRole(role._id)}>
              <SettingOutlined />
            </Button>
          </Tooltip>
        )}
        {permissionValueList["role.update"] && (
          <Tooltip title="更新角色">
            <Button
              type="primary"
              style={{ margin: "0 10px" }}
              onClick={this.showUpdateRole(role._id)}
            >
              <FormOutlined />
            </Button>
          </Tooltip>
        )}
        {permissionValueList["role.remove"] && (
          <Tooltip title="删除角色">
            <Button type="danger" onClick={this.removeRole(role)}>
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
      title: "角色名称",
      dataIndex: "roleName",
    },
    {
      title: "昵称",
      dataIndex: "remark",
    },
    {
      title: "操作",
      width: 200,
      fix: "right",
      render: this.renderTableItem,
    },
  ];

  componentDidMount() {
    const { roleList } = this.props;
    if (roleList.total) return;
    const { page, limit } = this.state;
    this.handleTableChange(page, limit);
  }

  handleTableChange = (page, limit) => {
    this.setState({
      tableLoading: true,
    });

    this.getRoleList({ page, limit }).finally(() => {
      this.setState({
        tableLoading: false,
        page,
        limit,
      });
    });
  };

  getRoleList = ({ page, limit, roleName }) => {
    return this.props.getRoleList({ page, limit, roleName }).then((total) => {
      if (total === 0) {
        message.warning("暂无角色列表数据");
        return;
      }
      message.success("获取角色列表数据成功");
    });
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  };

  showAddRole = () => {
    this.props.history.push("/acl/role/add");
  };

  handleExtraBtns = (permissionValueList) => {
    const extra = [];
    if (permissionValueList["role.add"]) {
      extra.push(
        <Button type="primary" key="0" onClick={this.showAddRole}>
          <PlusOutlined />
          <span>新增</span>
        </Button>
      );
    }

    if (permissionValueList["role.remove"]) {
      extra.push(
        <Button type="danger" key="1" onClick={this.batchRemoveRole}>
          <span>批量删除</span>
        </Button>
      );
    }

    return extra;
  };

  updateSearchValues = (searchValues) => {
    this.setState({
      searchValues,
    });
  };

  refresh = () => {
    const { page, limit } = this.state;
    this.getRoleList({ page, limit }).then(() => {
      message.success("刷新数据成功！");
    });
  };

  render() {
    const { page, limit, tableLoading, selectedRowKeys } = this.state;

    let {
      roleList: { items, total },
      permissionValueList,
    } = this.props;

    const roleList = items.map((item, index) => {
      return {
        ...item,
        index: index + 1,
      };
    });

    const extra = this.handleExtraBtns(permissionValueList);

    return (
      <div ref={this.containerRef} style={{ backgroundColor: "#f5f5f5" }}>
        <SearchForm
          getRoleList={this.getRoleList}
          limit={limit}
          updateSearchValues={this.updateSearchValues}
        />
        <Table
          container={this.containerRef}
          onRefresh={this.refresh}
          title="角色数据列表"
          extra={extra}
          selectedRowKeys={selectedRowKeys}
          onSelectChange={this.onSelectChange}
          columns={this.columns}
          dataSource={roleList}
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

export default Role;
