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
import { reqGetTeacherList } from "@api/edu/teacher";
import { filterPermissions } from "@utils/tools";

const { Text } = Typography;

@connect(
  (state) => ({
    userList: state.userList,
    permissionValueList: filterPermissions(
      state.user.permissionValueList,
      "teacher"
    ),
  }),
  { getUserList, removeUser, batchRemoveUser }
)
class Teacher extends Component {
  state = {
    selectedRowKeys: [],
    tableLoading: false,
    page: 1, // 页数
    limit: 10, // 每页显示条数
    teacherList: [],
    total: 0,
    previewVisible: false,
    previewImage: "",
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

  renderTableItem = () => {
    const { permissionValueList } = this.props;

    return (
      <div>
        {permissionValueList["teacher.update"] && (
          <Tooltip title="更新">
            <Button type="primary">
              <FormOutlined />
            </Button>
          </Tooltip>
        )}
        {permissionValueList["teacher.remove"] && (
          <Tooltip title="删除">
            <Button type="danger" style={{ marginLeft: 10 }}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        )}
      </div>
    );
  };

  showImgModal = (img) => {
    return () => {
      this.setState({
        previewVisible: true,
        previewImage: img,
      });
    };
  };

  handleImgModal = () => {
    this.setState({
      previewVisible: false,
    });
  };

  columns = [
    {
      title: "序号",
      dataIndex: "index",
      width: 70,
    },
    {
      title: "讲师姓名",
      dataIndex: "name",
    },
    {
      title: "头像",
      dataIndex: "avatar",
      width: 120,
      render: (img) => (
        <img
          onClick={this.showImgModal(img)}
          style={{ width: 50, height: 40, cursor: "pointer" }}
          src={img}
          alt="头像"
        />
      ),
    },
    {
      title: "详细介绍",
      dataIndex: "intro",
      ellipsis: true,
      width: 300,
    },
    {
      title: "简介",
      dataIndex: "career",
    },
    {
      title: "讲师级别",
      dataIndex: "level",
      render: (level) => {
        return level === 1 ? "高级讲师" : "首席讲师";
      },
    },
    {
      title: "创建时间",
      dataIndex: "gmtCreate",
    },
    {
      title: "操作",
      render: this.renderTableItem,
      width: 200,
      fixed: "right",
    },
  ];

  componentDidMount() {
    const { page, limit } = this.state;
    this.handleTableChange(page, limit);
  }

  handleTableChange = (page, limit) => {
    this.setState({
      tableLoading: true,
    });

    const {
      name,
      level,
      gmtCreateBegin,
      gmtCreateEnd,
    } = this.state.searchValues;

    return this.getTeacherList({
      page,
      limit,
      name,
      level,
      gmtCreateBegin,
      gmtCreateEnd,
    }).finally(() => {
      this.setState({
        tableLoading: false,
      });
    });
  };

  getTeacherList = ({
    page,
    limit,
    name,
    level,
    gmtCreateBegin,
    gmtCreateEnd,
  }) => {
    return reqGetTeacherList({
      page,
      limit,
      name,
      level,
      gmtCreateBegin,
      gmtCreateEnd,
    }).then((teachers = {}) => {
      const { total, items } = teachers;

      if (!total) {
        message.warning("暂无讲师数据");
        return;
      }

      this.setState({
        page,
        limit,
        teacherList: items.map((item, index) => ({
          ...item,
          index: index + 1,
        })),
        total,
      });

      message.success("获取讲师分页列表数据成功");
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
    this.handleTableChange({ page, limit }).then(() => {
      message.success("刷新数据成功！");
    });
  };

  render() {
    const {
      selectedRowKeys,
      tableLoading,
      page,
      limit,
      teacherList,
      total,
      previewVisible,
      previewImage,
    } = this.state;

    const { permissionValueList } = this.props;

    const extra = this.handleExtraBtns(permissionValueList);

    return (
      <div ref={this.containerRef} style={{ backgroundColor: "#f5f5f5" }}>
        <SearchForm
          getTeacherList={this.getTeacherList}
          limit={limit}
          updateSearchValues={this.updateSearchValues}
        />
        <Table
          container={this.containerRef}
          onRefresh={this.refresh}
          title="讲师数据列表"
          extra={extra}
          selectedRowKeys={selectedRowKeys}
          onSelectChange={this.onSelectChange}
          columns={this.columns}
          dataSource={teacherList}
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
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleImgModal}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default Teacher;
