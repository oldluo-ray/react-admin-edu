import React, { Component } from 'react'
import { connect } from 'react-redux'

//导入antd组件
import { Link } from 'react-router-dom'
import { Card, Button, Form, Input, Switch, message, Upload } from 'antd'
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons'

import MyUpload from '../MyUpload'
import { reqAddLesson } from '@api/edu/lesson'

// 导入样式
import './index.less'

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

// @connect(
//   state => ({ subjectList: state.subjectList }),
//   { getSubjectList }
// )

class AddLesson extends Component {
  // 点击添加按钮,表单校验成功之后的回调函数
  onFinish = async values => {
    console.log(values)

    //要发送请求,添加课时
    // 问题: 如何获取chapterId
    const chapterId = this.props.location.state._id
    // console.log(this.props)
    const data = {
      ...values,
      chapterId
    }
    await reqAddLesson(data)
    message.success('课时添加成功')
    this.props.history.push('/edu/chapter/list')
  }

  render() {
    return (
      <Card
        title={
          <>
            <Link to='/edu/chapter/list'>
              <ArrowLeftOutlined />
            </Link>
            <span className='add-lesson'>新增课时</span>
          </>
        }
      >
        <Form
          // 给表单中的表单项布局
          {...layout}
          // 当点击表单内的提交按钮,onFinish会触发
          onFinish={this.onFinish}
          // 提交失败的时候会触发
          // onFinishFailed={onFinishFailed}

          initialValues={{
            // 键就是表单项的name属性的值
            free: true
          }}
        >
          {/* form表单中每一个表单项都需要使用Form.Item包裹 */}
          <Form.Item
            // 表示提示文字
            label='课时名称'
            // 表单项提交时的属性
            name='title'
            // 校验规则
            rules={[
              {
                required: true,
                // 校验不通过时的提示文字
                message: '请输入课时名称'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='是否免费'
            name='free'
            rules={[
              {
                required: true,
                message: '请选择是否免费'
              }
            ]}
            // 默认表单控制表单项的属性值是value,但是switch的值不是value,是checked,所以要改成checked
            valuePropName='checked'
          >
            <Switch
              checkedChildren='开启'
              unCheckedChildren='关闭'
              defaultChecked
            />
          </Form.Item>

          <Form.Item
            label='上传视频'
            name='video'
            rules={[
              {
                required: true,
                message: '请选择上传视频'
              }
            ]}
          >
            {/* 上传逻辑复杂,所以封装到MyUpload中 */}
            <MyUpload></MyUpload>
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

export default AddLesson
