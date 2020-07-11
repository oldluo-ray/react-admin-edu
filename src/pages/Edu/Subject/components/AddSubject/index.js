import React, { Component } from 'react'

//导入antd组件
import { Link } from 'react-router-dom'
import { Card, Button, Form, Input, Select } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

// 导入样式
import './index.less'

// 获取Option组件
const Option = Select.Option

//表单布局属性
const layout = {
  // antd把一个宽度分为24份
  // 表单文字描述部分
  labelCol: {
    span: 3
  },
  // 表单项部分
  wrapperCol: {
    span: 6
  }
}

// 点击添加按钮,表单校验成功之后的回调函数
const onFinish = values => {
  console.log('Success:', values)
}
// 表单校验失败的回调函数
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo)
}

export default class AddSubject extends Component {
  render() {
    return (
      <Card
        title={
          <>
            <Link to='/edu/subject/list'>
              <ArrowLeftOutlined />
            </Link>
            <span className='add-subject'>新增课程</span>
          </>
        }
      >
        <Form
          // 给表单中的表单项布局
          {...layout}
          name='subject'
          // 当点击表单内的提交按钮,onFinish会触发
          onFinish={onFinish}
          // 提交失败的时候会触发
          onFinishFailed={onFinishFailed}
        >
          {/* form表单中每一个表单项都需要使用Form.Item包裹 */}
          <Form.Item
            // 表示提示文字
            label='课程分类名称'
            // 表单项提交时的属性
            name='subjectname'
            // 校验规则
            rules={[
              {
                required: true,
                // 校验不通过时的提示文字
                message: '请输入课程分类!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='父级分类id'
            name='parentid'
            rules={[
              {
                required: true,
                message: '请选择分类id'
              }
            ]}
          >
            <Select>
              <Option value={1}>{'一级菜单'}</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            {/* htmlType表示这个按钮是表单内的提交按钮 */}
            <Button type='primary' htmlType='submit'>
              添加
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
