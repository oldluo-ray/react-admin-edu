import React, { Component } from 'react'
import { Button, message, Table, Tooltip, Modal } from 'antd'
import {
  FormOutlined,
  DeleteOutlined,
  UploadOutlined,
  PlusOutlined,
  FullscreenOutlined,
  // FullscreenExitOutlined,
  RedoOutlined,
  SettingOutlined
} from '@ant-design/icons'

import { connect } from 'react-redux'
import SearchForm from './SearchForm'
import { getCourseList } from './redux'

// import { filterPermissions } from "@utils/permission";
import './index.less'

@connect(
  state => ({
    courseList: state.courseList
    // permissionValueList: filterPermissions(
    //   state.course.permissionValueList,
    //   "Course"
    // )
  }),
  { getCourseList }
)
class Course extends Component {
  state = {
    searchLoading: false,
    tableLoading: false,
    page: 1, // 页数
    limit: 5, // 每页显示条数
    previewVisible: false,
    previewImage: ''
  }

  search = searchName => {
    this.setState({
      searchLoading: true
    })

    const { page, limit } = this.state

    // this.getcourseList({ Coursename: searchName, page, limit }).finally(() => {
    //   this.setState({
    //     searchLoading: false
    //   })
    // })
  }

  renderTableItem = () => {
    // const { permissionValueList } = this.props;

    return (
      <div>
        <Tooltip title='发布课程'>
          <Button type='primary'>
            <UploadOutlined />
          </Button>
        </Tooltip>
        <Tooltip title='更新课程'>
          <Button type='primary' className='acl-edit-btn'>
            <FormOutlined />
          </Button>
        </Tooltip>
        <Tooltip title='删除课程'>
          <Button type='danger'>
            <DeleteOutlined />
          </Button>
        </Tooltip>
      </div>
    )
  }

  showImgModal = img => {
    return () => {
      this.setState({
        previewVisible: true,
        previewImage: img
      })
    }
  }

  handleImgModal = () => {
    this.setState({
      previewVisible: false
    })
  }

  columns = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 70
    },
    {
      title: '课程标题',
      dataIndex: 'title',
      ellipsis: true,
      width: 200
    },
    {
      title: '课程描述',
      dataIndex: 'description',
      ellipsis: true,
      width: 300
    },
    {
      title: '课程图片',
      dataIndex: 'cover',
      width: 120,
      render: img => (
        <img
          onClick={this.showImgModal(img)}
          style={{ width: 50, height: 40, cursor: 'pointer' }}
          src={img}
          alt='课程图片'
        />
      )
    },
    {
      title: '课程价格',
      dataIndex: 'price',
      render: text => <span>{`￥ ${text}`}</span>,
      width: 120,
      // 前端排序
      // sorter: {
      //   compare: (a, b) => b.price - a.price
      // }
      sorter: true // 后台排序~
    },
    {
      title: '课程讲师',
      dataIndex: 'teacherId',
      width: 100
    },
    {
      title: '所属课程分类',
      dataIndex: 'subjectParentId',
      width: 150
    },
    {
      title: '总课时',
      dataIndex: 'lessonNum',
      width: 100,
      render: text => <span>{`${text} 小时`}</span>,
      sorter: {
        compare: (a, b) => b.lessonNum - a.lessonNum
      }
    },
    {
      title: '总阅读量',
      dataIndex: 'viewCount',
      width: 100,
      render: text => <span>{`${text} 次`}</span>
    },
    {
      title: '总购买量',
      dataIndex: 'buyCount',
      width: 100,
      render: text => <span>{`${text} 个`}</span>
    },
    {
      title: '最新修改时间',
      dataIndex: 'gmtModified',
      width: 200
    },
    {
      title: '课程状态',
      dataIndex: 'status',
      width: 100
    },
    {
      title: '版本号',
      dataIndex: 'version',
      width: 100
    },
    {
      title: '操作',
      render: this.renderTableItem,
      width: 200,
      // 让表格中某一列固定在一个位置
      fixed: 'right'
    }
  ]

  componentDidMount() {
    // const { page, limit } = this.state;
    // this.handleTableChange(page, limit);
  }

  handleTableChange = async (page, limit) => {
    this.setState({
      tableLoading: true
    })

    // this.getcourseList({ page, limit }).finally(() => {
    //   this.setState({
    //     tableLoading: false,
    //     page,
    //     limit
    //   })
    // })

    // 调用异步action.发送请求,获取下一页数据,然后试图会重新渲染
    await this.props.getCourseList({ page, limit })
    this.setState({
      tableLoading: false
    })
    message.success('数据获取成功')
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

  render() {
    const {
      page,
      limit,
      tableLoading,
      previewVisible,
      previewImage
    } = this.state

    // 从redux中获取数据
    let { courseList } = this.props
    // 给数据添加一个index属性,实现在表格中展示序号
    courseList = courseList.items.map((item, index) => {
      return {
        ...item,
        index: index + 1
      }
    })

    // total表示课程所有数据量
    const total = this.props.courseList.total

    return (
      <div>
        <div className='course-search'>
          <SearchForm />
        </div>

        <div className='course-table'>
          <div className='course-table-header'>
            <h3>课程数据列表</h3>
            <div>
              <Button type='primary' style={{ marginRight: 10 }}>
                <PlusOutlined />
                <span>新建</span>
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
          <Table
            columns={this.columns}
            dataSource={courseList}
            rowKey='_id'
            pagination={{
              current: page,
              pageSize: limit,
              pageSizeOptions: ['5', '10', '20', '30', '40', '50', '100'],
              showQuickJumper: true,
              showSizeChanger: true,
              total,
              onChange: this.handleTableChange,
              onShowSizeChange: this.handleTableChange
            }}
            // 在表格中展示一个正在加载的效果
            loading={tableLoading}
            // 让表格水平方向可以滚动
            scroll={{ x: 1200 }}
            onChange={(pagination, filters, sorter, extra) => {
              console.log('后台排序')
              console.log(pagination, filters, sorter, extra)
            }}
          />
        </div>

        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleImgModal}
        >
          <img alt='example' style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

export default Course
