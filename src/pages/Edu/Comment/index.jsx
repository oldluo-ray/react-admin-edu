import React, { Component } from "react";
import {
  Button,
  message,
  List,
  Tooltip,
  Modal,
  Comment as AntdComment,
  Checkbox,
  Alert,
} from "antd";
import {
  FullscreenOutlined,
  RedoOutlined,
  SettingOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";

import { connect } from "react-redux";
import SearchForm from "./SearchForm";

import "./index.less";

dayjs.extend(relativeTime);

const data = [
  {
    author: "会飞的猫子",
    avatar:
      "http://www.gulixueyuan.com/files/default/2020/02-18/082322a1625f815098.jpg",
    content: <p>讲的非常好</p>,
    datetime: (
      <Tooltip title={dayjs().subtract(4, "day").format("YYYY-MM-DD HH:mm:ss")}>
        <span>{dayjs().subtract(4, "day").fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    author: "出名的猴儿",
    avatar:
      "http://www.gulixueyuan.com/files/system/2017/11-17/10315282ebcf884740.jpg",
    content: <p>尚硅谷牛逼</p>,
    datetime: (
      <Tooltip title={dayjs().format("YYYY-MM-DD HH:mm:ss")}>
        <span>{dayjs().fromNow()}</span>
      </Tooltip>
    ),
  },
];

@connect(
  (state) => ({
    // courseList: state.courseList
    // permissionValueList: filterPermissions(
    //   state.course.permissionValueList,
    //   "Course"
    // )
  })
  // { getcourseList }
)
class Comment extends Component {
  state = {
    searchLoading: false,
    previewVisible: false,
    previewImage: "",
    checkedValues: [],
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

  componentDidMount() {
    // const { page, limit } = this.state;
    // this.handleTableChange(page, limit);
  }

  handleTableChange = (page, limit) => {
    this.setState({
      tableLoading: true,
    });

    this.getcourseList({ page, limit }).finally(() => {
      this.setState({
        tableLoading: false,
        page,
        limit,
      });
    });
  };

  getcourseList = ({ page, limit, Coursename, nickName }) => {
    return this.props
      .getcourseList({ page, limit, Coursename, nickName })
      .then((total) => {
        if (total === 0) {
          message.warning("暂无用户列表数据");
          return;
        }
        message.success("获取用户列表数据成功");
      });
  };

  onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
    this.setState({
      checkedValues,
    });
  };

  render() {
    const { previewVisible, previewImage, checkedValues } = this.state;

    return (
      <div>
        <div className="course-search">
          <SearchForm />
        </div>
        <div className="course-table">
          <div className="course-table-header">
            <h3>课程评论列表</h3>
            <div>
              <Button type="danger" style={{ marginRight: 10 }}>
                <span>批量删除</span>
              </Button>
              <Tooltip title="全屏" className="course-table-btn">
                <FullscreenOutlined />
              </Tooltip>
              <Tooltip title="刷新" className="course-table-btn">
                <RedoOutlined />
              </Tooltip>
              <Tooltip title="设置" className="course-table-btn">
                <SettingOutlined />
              </Tooltip>
            </div>
          </div>
          <Alert
            message={
              <span>
                <InfoCircleOutlined
                  style={{ marginRight: 10, color: "#1890ff" }}
                />
                {`已选择 ${checkedValues.length} 项`}
              </span>
            }
            type="info"
          />
          <Checkbox.Group onChange={this.onChange} style={{ width: "100%" }}>
            <List
              header={`一共${data.length}条评论`}
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <div className="comment-item">
                  <div className="comment-item-checkbox">
                    <Checkbox value={item.author} />
                  </div>
                  <div className="comment-item-list">
                    <List.Item
                      actions={[
                        <Button type="primary">编辑</Button>,
                        <Button type="danger">删除</Button>,
                      ]}
                    >
                      <AntdComment
                        actions={item.actions}
                        author={item.author}
                        avatar={item.avatar}
                        content={item.content}
                        datetime={item.datetime}
                      />
                    </List.Item>
                  </div>
                </div>
              )}
            />
          </Checkbox.Group>
        </div>

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

export default Comment;
