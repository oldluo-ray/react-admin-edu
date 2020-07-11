import React, { Component } from 'react'
// 导入antd组件
import { Button, Table, Tooltip, Input } from 'antd'
// 导入antd-图标
import { PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons'

// 导入connect
import { connect } from 'react-redux'

//导入定义的发送请求的方法
// import { reqGetSubjectList } from '@api/edu/subject'

// 导入redux中的异步anction
import { getSubjectList, getSecSubjectList } from './redux'

//导入样式文件
import './index.less'

// {subjectList: {total:0, items: []}}
@connect(
  state => ({ subjectList: state.subjectList }),
  // 这里传入的是一个异步action.但是在展示组件中使用的函数,是通过connect进行封装之后的,虽然函数名一样,但是并不是同一个函数
  { getSubjectList, getSecSubjectList }
)
class Subject extends Component {
  // 直接给当前组件实例,添加currentPage属性,表示当前是第几页
  currentPage = 1

  state = {
    // subjectId的作用:
    // 1. 如果subjectId没有表示表格每一行直接展示课程分类的title,如果有值(应该就是要修改数据的id), 就展示input
    // 2. 修改数据需要subjectid
    subjectId: '',
    subjectTitle: '' //用于设置受控组件
  }

  componentDidMount() {
    // this.getSubjectList(1, 10)
    this.props.getSubjectList(1, 10)
  }

  // 获取subject数据的方法
  // getSubjectList = async (page, limit) => {
  //   const res = await reqGetSubjectList(page, limit)
  //   console.log(res)

  //   this.setState({
  //     subject: res
  //   })
  // }

  // 点击页码,获取对应页的数据
  handlePageChange = (page, pageSize) => {
    // console.log(page, pageSize)

    // 发送请求
    // this.getSubjectList(page, pageSize)
    this.props.getSubjectList(page, pageSize)
    // 动态给currentPage赋值,保证当前高亮的页码和实际获取的页码数据保持一致
    this.currentPage = page
  }

  // 一页展示几条数据变化时触发的回调函数
  handleSizeChange = (current, size) => {
    // console.log(current, size)
    // this.getSubjectList(current, size)
    this.props.getSubjectList(current, size)
    // 动态给currentPage赋值,保证当前高亮的页码和实际获取的页码数据保持一致
    this.currentPage = current
  }

  // 点击跳转到添加课程分类中
  handleGoAddSubject = () => {
    // 注意: 新增是在教学模块下面,所以路由前面要加edu
    this.props.history.push('/edu/subject/add')
  }

  // 点击可展开按钮触发
  // expanded: true表示展开了, false表示关闭了
  // record: 就是对应的这一行的数据
  handleClickExpand = (expanded, record) => {
    // console.log(expanded, record)
    //判断如果是展开就请求二级菜单数据,关闭就什么都不做
    if (expanded) {
      // 请求二级菜单数据
      // 需要传入parentId
      this.props.getSecSubjectList(record._id)
    }
  }

  // 点击更新按钮的事件处理函数
  handleUpdateClick = value => {
    //修改subjectid
    return () => {
      // console.log(value)
      this.setState({
        subjectId: value._id,
        subjectTitle: value.title
      })
    }
  }

  // 修改数据时,受控组件input的change回调函数
  handleTitleChange = e => {
    this.setState({
      subjectTitle: e.target.value
    })
  }
  render() {
    // 注意:这个columns必须写到render中,因为state变化,render会调用.这个columns才会重新执行
    const columns = [
      // columns 定义表格的列
      // title属性: 表示列的名称
      // dataIndex决定: 这一列展示的是data中哪一项的数据
      {
        title: '分类名称',
        // dataIndex: 'title',
        key: 'title',
        render: value => {
          //如果state里面存储的id 和 这一条数据的id相同,就展示input
          // 由于第一页数据有10条,所以这个render的回调会执行10次
          // 接收value是对饮的每一行数据
          if (this.state.subjectId === value._id) {
            return (
              <Input
                value={this.state.subjectTitle}
                className='subject-input'
                onChange={this.handleTitleChange}
              />
            )
          }

          return <span>{value.title}</span>
        }
      },

      {
        title: '操作',
        dataIndex: '', //表示这一列不渲染data里的数据
        key: 'x',
        // 自定义这一列要渲染的内容
        render: value => {
          //判断当前数据的id是否和state里面subjectId的值是相同的,如果相同,展示确认和取消按钮,否则展示修改和删除按钮

          if (this.state.subjectId === value._id) {
            return (
              <>
                <Button type='primary' className='update-btn'>
                  确认
                </Button>
                <Button type='danger'>取消</Button>
              </>
            )
          }

          return (
            <>
              <Tooltip title='更新课程分类'>
                <Button
                  type='primary'
                  className='update-btn'
                  onClick={this.handleUpdateClick(value)}
                >
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip title='删除课程分类'>
                <Button type='danger'>
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </>
          )
        },
        // 设置这一列的宽度
        width: 200
      }
    ]

    return (
      <div className='subject'>
        <Button
          type='primary'
          className='subject-btn'
          onClick={this.handleGoAddSubject}
        >
          <PlusOutlined />
          新建
        </Button>
        <Table
          // 控制列
          columns={columns}
          // 控制可展开项
          expandable={{
            // 可展开项展示的内容
            // 注意:使用这个属性会把二级菜单数据,渲染到一级菜单的位置上
            // 所以不使用这个
            // expandedRowRender: record => (
            //   <p
            //当点击可展开按钮,触发的事件处理函数

            onExpand: this.handleClickExpand
          }}
          //表示里面的数据
          dataSource={this.props.subjectList.items}
          // 告诉Table组件,使用数据中_id作为key值
          rowKey='_id'
          pagination={{
            total: this.props.subjectList.total, //total表示数据总数
            showQuickJumper: true, //是否显示快速跳转
            showSizeChanger: true, // 是否显示修改每页显示数据数量
            pageSizeOptions: ['5', '10', '15', '20'], //设置每天显示数据数量的配置项
            // defaultPageSize: 5 //每页默认显示数据条数 默认是10,
            onChange: this.handlePageChange,
            onShowSizeChange: this.handleSizeChange,
            current: this.currentPage
          }}
        />
      </div>
    )
  }
}
export default Subject
