import React, { useEffect, useState } from 'react'
import { Form, Select, Button, message } from 'antd'
import { connect } from 'react-redux'

import { reqGetCourseList } from '@api/edu/course'
import { getChapterList } from '../redux'

import './index.less'

const { Option } = Select

// 注意: 函数组件不可以使用修饰器语法
function SearchForm(props) {
  // 定义课程列表的状态
  const [courseList, setCourseList] = useState([])

  const [form] = Form.useForm()

  const resetForm = () => {
    form.resetFields(['courseId'])
  }

  //获取课程列表数据/ 组件挂载成功获取数据
  useEffect(() => {
    // 模拟类组件的componentDidMount
    // 注意: useEffect的回调函数不允许是一个异步函数,所以,在回调函数中重新定义一个异步函数
    async function fetchData() {
      const res = await reqGetCourseList()
      console.log(res)
      // 给课程列表状态赋值
      setCourseList(res)
    }
    fetchData()
  }, [])

  // 根据课程获取章节列表数据的方法
  const handleGetChapterList = async value => {
    console.log(value)
    const data = {
      page: 1,
      limit: 10,
      courseId: value.courseId
    }
    await props.getChapterList(data)
    message.success('课程章节列表数据获取成功')
  }

  return (
    <Form layout='inline' form={form} onFinish={handleGetChapterList}>
      <Form.Item name='courseId' label='课程'>
        <Select
          allowClear
          placeholder='课程'
          style={{ width: 250, marginRight: 20 }}
        >
          {courseList.map(course => (
            <Option key={course._id} value={course._id}>
              {course.title}
            </Option>
          ))}
          {/* <Option value='1'>1</Option>
          <Option value='2'>2</Option>
          <Option value='3'>3</Option> */}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          style={{ margin: '0 10px 0 30px' }}
        >
          查询课程章节
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  )
}

export default connect(
  null,
  { getChapterList }
)(SearchForm)
