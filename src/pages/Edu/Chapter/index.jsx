import React, { Component } from 'react'
import { Button, message, Tooltip, Modal, Alert, Table } from 'antd'
import {
  FullscreenOutlined,
  RedoOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  FormOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'

import { connect } from 'react-redux'
// 导入知乎提供的视频播放组件
import Player from 'griffith'

import SearchForm from './SearchForm'
import { getLessonList } from './redux'
import './index.less'

dayjs.extend(relativeTime)

@connect(
  state => ({
    // courseList: state.courseList
    // permissionValueList: filterPermissions(
    //   state.course.permissionValueList,
    //   "Course"
    // )
    chapterList: state.chapterList
  }),
  { getLessonList }
  // { getcourseList }
)
class Chapter extends Component {
  state = {
    searchLoading: false,
    previewVisible: false, //控制modal窗口是否展示
    previewImage: '',
    selectedRowKeys: [],
    video: ''
  }

  // video就是要预览的视频的路径
  showModal = video => () => {
    this.setState({
      previewVisible: true,
      video
    })
  }

  handleImgModal = () => {
    this.setState({
      previewVisible: false
    })
  }

  componentDidMount() {
    // const { page, limit } = this.state;
    // this.handleTableChange(page, limit);
  }

  handleTableChange = (page, limit) => {
    this.setState({
      tableLoading: true
    })

    this.getcourseList({ page, limit }).finally(() => {
      this.setState({
        tableLoading: false,
        page,
        limit
      })
    })
  }

  getcourseList = ({ page, limit, Coursename, nickName }) => {
    return this.props
      .getcourseList({ page, limit, Coursename, nickName })
      .then(total => {
        if (total === 0) {
          message.warning('暂无用户列表数据')
          return
        }
        message.success('获取用户列表数据成功')
      })
  }

  onSelectChange = selectedRowKeys => {
    this.setState({
      selectedRowKeys
    })
  }

  // handleClickExpand ray 定义的点击展开按钮的事件处理函数
  handleClickExpand = (expand, record) => {
    console.log(expand, record)
    // console.log(expand)
    if (expand) {
      // 发送请求获取数据
      this.props.getLessonList(record._id)
    }
  }

  // 点击跳转到新增课时页面
  handleGoAddLesson = data => () => {
    this.props.history.push('/edu/chapter/addlesson', data)
  }

  render() {
    const { previewVisible, previewImage, selectedRowKeys } = this.state

    const columns = [
      {
        title: '章节名称',
        dataIndex: 'title'
      },
      {
        title: '是否免费',
        dataIndex: 'free',
        // 注意: 如果没有写dataIndex,render函数接收到的就是这一行数据(应该是一个对象)
        // 如果dataIndex写了值,那么render函数接收到的就是这一行数据中对应的dataIndex中那个属性的值
        render: isFree => {
          // console.log(isFree)
          // 这行代码实现了,章节不展示是否免费, 只有课时才展示
          return isFree === true ? '是' : isFree === false ? '否' : ''
        }
      },

      {
        title: '视频',
        // dataIndex: 'free',
        // 注意: 如果没有写dataIndex,render函数接收到的就是这一行数据(应该是一个对象)
        // 如果dataIndex写了值,那么render函数接收到的就是这一行数据中对应的dataIndex中那个属性的值
        render: value => {
          // 如果是章节数据,不展示任何内容
          // 如果是课时数据,判断是否是免费,如果是免费就展示预览按钮
          // 章节数据没有free属性, 什么都不展示
          // 如果课时的free是false, 也返回undefined. 符合项目业务逻辑
          if (!value.free) return
          return <Button onClick={this.showModal(value.video)}>预览</Button>

          // return isFree === true ? '是' : isFree === false ? '否' : ''
        }
      },
      {
        title: '操作',
        width: 300,
        fixed: 'right',
        render: data => {
          // 如果是章节,章节数据中没有free属性,课时数据中有
          return (
            <div>
              {data.free === undefined && (
                <Tooltip title='新增课时'>
                  <Button
                    type='primary'
                    style={{ marginRight: 10 }}
                    onClick={this.handleGoAddLesson(data)}
                  >
                    <PlusOutlined />
                  </Button>
                </Tooltip>
              )}
              <Tooltip
                title={data.free === undefined ? '更新章节' : '更新课时'}
              >
                <Button type='primary' style={{ marginRight: 10 }}>
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip
                title={data.free === undefined ? '删除章节' : '删除课时'}
              >
                <Button type='danger'>
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </div>
          )
        }
        // }
      }
    ]

    const sources = {
      hd: {
        play_url: this.state.video, //真正需要的属性 , 预览视频的路径
        // 下面这些属性,其实不写也可以,但是会提示这个必须属性,所以为了不展示错误提示,加了这些属性,值随便写就可以
        bitrate: 1,
        duration: 1000,
        format: '',
        height: 500,
        size: 160000,
        width: 500
      }
      // sd: {
      //   // play_url:
      // }
    }

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
      // hideDefaultSelections: true,
      // selections: [
      //   Table.SELECTION_ALL,
      //   Table.SELECTION_INVERT,
      //   {
      //     key: "odd",
      //     text: "Select Odd Row",
      //     onSelect: changableRowKeys => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //         if (index % 2 !== 0) {
      //           return false;
      //         }
      //         return true;
      //       });
      //       this.setState({ selectedRowKeys: newSelectedRowKeys });
      //     }
      //   },
      //   {
      //     key: "even",
      //     text: "Select Even Row",
      //     onSelect: changableRowKeys => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //         if (index % 2 !== 0) {
      //           return true;
      //         }
      //         return false;
      //       });
      //       this.setState({ selectedRowKeys: newSelectedRowKeys });
      //     }
      //   }
      // ]
    }

    return (
      <div>
        <div className='course-search'>
          <SearchForm />
        </div>
        <div className='course-table'>
          <div className='course-table-header'>
            <h3>课程章节列表</h3>
            <div>
              <Button type='primary' style={{ marginRight: 10 }}>
                <PlusOutlined />
                <span>新增</span>
              </Button>
              <Button type='danger' style={{ marginRight: 10 }}>
                <span>批量删除</span>
              </Button>
              <Tooltip title='全屏' className='course-table-btn'>
                <FullscreenOutlined />
              </Tooltip>
              <Tooltip title='刷新' className='course-table-btn'>
                <RedoOutlined />
              </Tooltip>
              <Tooltip title='设置' className='course-table-btn'>
                <SettingOutlined />
              </Tooltip>
            </div>
          </div>
          <Alert
            message={
              <span>
                <InfoCircleOutlined
                  style={{ marginRight: 10, color: '#1890ff' }}
                />
                {`已选择 ${selectedRowKeys.length} 项`}
              </span>
            }
            type='info'
            style={{ marginBottom: 20 }}
          />
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.chapterList.items}
            rowKey='_id'
            expandable={{
              onExpand: this.handleClickExpand
            }}
          />
        </div>
        {/* antd中对话框组件, 预览功能就是要在modal中实现预览视频 */}
        <Modal
          title='视频'
          visible={previewVisible}
          // 点击modal的关闭按钮,触发这个函数
          onCancel={this.handleImgModal}
          footer={null}
          destroyOnClose={true}
        >
          <Player
            sources={sources} // 必须有,定义预览视频的路径, 多个视频源
            id={'1'}
            cover={'http://localhost:3000/logo512.png'} //视频封面
            duration={1000}
          ></Player>
        </Modal>
      </div>
    )
  }
}

export default Chapter
