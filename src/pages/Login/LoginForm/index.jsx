import React, { Component, useState } from 'react'
import { Form, Input, Button, Checkbox, Row, Col, Tabs } from 'antd'
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  GithubOutlined,
  WechatOutlined,
  QqOutlined
} from '@ant-design/icons'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { login } from '@redux/actions/login'
import { reqGetverifyCode } from '@api/acl/oauth'

import './index.less'

const { TabPane } = Tabs

// let downCount = 5
function LoginForm(props) {
  const [form] = Form.useForm()

  const [isShowDownCount, setIsShowDownCount] = useState(false)
  let [downCount, setDownCount] = useState(5)

  const onFinish = ({ username, password }) => {
    // console.log('finish执行了')
    props.login(username, password).then(token => {
      // 登录成功
      // console.log("登陆成功~");
      // 持久存储token
      localStorage.setItem('user_token', token)
      props.history.replace('/')
    })
    // .catch(error => {
    //   notification.error({
    //     message: "登录失败",
    //     description: error
    //   });
    // });
  }

  const validator = (rules, value) => {
    // console.log(rules, value)
    // rules 表示校验的是哪个表单项
    // value 表单项的值
    // 返回值: promise对象, 成功返回成功的promise,否则返回失败的promise
    return new Promise((resolve, reject) => {
      // 校验密码框
      /* 
        用户名的校验规则: 
        1. 必填项
        2. 长度大于4个字符
        3. 长度不能超过16个字符
        4. 只能是字母,数字,下划线

        表单校验的触发时机: 输入内容的时候会触发,
        点击表单的提交按钮,提交前也会触发
      
      */
      if (!value) {
        return reject('必须添加密码')
      }

      if (value.length < 4) {
        return reject('密码不能少于4个字符')
      }

      if (value.length > 16) {
        return reject('密码不能大于16个字符')
      }

      if (!/^[0-9a-zA-Z_]+$/.test(value)) {
        return reject('密码只能输入数字,字母,下划线')
      }

      resolve()
    })
  }

  const getVerifyCode = async () => {
    // console.log('获取验证码按钮触发了')
    // 1. 手动触发表单的表单的校验,只有校验通过了,才去执行后续代码
    // 调用form实例的validateFields方法
    // form
    //   // .validateFields() // 如果不传参,会校验表单项所有的表单
    //   .validateFields(['phone']) // 如果传参,只校验指定的表单项
    //   .then(res => {
    //     console.log(res)
    //   })
    // .catch(err => {
    //   console.log(err)
    // })

    const res = await form.validateFields(['phone'])
    // 如果验证不成功,后面就不会执行,成功了后面代码就可以执行
    // console.log('成功', res)
    // 2. 给开发者服务器发送请求
    // 注意:为了节省开支,获取验证码的代码,测试一次之后,最好注释掉,手机登录所有逻辑完成再打开

    // await reqGetverifyCode(res.phone)

    //后面的代码可以执行,说明验证码请求成功了

    // 3. 当请求发出去之后,按钮应该展示倒计时,并且倒计时的过程中,按钮不能点击
    // 点击获取验证码之后,让按钮禁用,然后展示倒计时
    setIsShowDownCount(true)
    // 定义一个定时器,修改倒计时的时间
    let timeId = setInterval(() => {
      // console.log(downCount)
      // 修改倒计时的时间
      downCount--
      setDownCount(downCount)
      if (downCount <= 0) {
        //清除定时器
        clearInterval(timeId)
        //取消按钮禁用
        setIsShowDownCount(false)
      }
    }, 1000)
  }

  return (
    <>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // 将form实例和Form组件关联起来
        form={form}
      >
        <Tabs
          defaultActiveKey='user'
          tabBarStyle={{ display: 'flex', justifyContent: 'center' }}
        >
          <TabPane tab='账户密码登陆' key='user'>
            {/* 
                用户名的校验规则: 
                1. 必填项
                2. 长度大于4个字符
                3. 长度不能超过16个字符
                4. 只能是字母,数字,下划线

                表单校验的触发时机: 输入内容的时候会触发,
                点击表单的提交按钮,提交前也会触发
              
              */}
            <Form.Item
              name='username'
              rules={[
                {
                  required: true,
                  message: '必须输入用户名'
                },
                {
                  min: 4,
                  message: '用户名至少四个字符'
                },
                {
                  max: 16,
                  message: '用户名不能超过十六个字符'
                },
                {
                  pattern: /^[0-9a-zA-Z_]+$/,
                  message: '只能输入数字字母下划线'
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className='form-icon' />}
                placeholder='用户名: admin'
              />
            </Form.Item>
            <Form.Item
              name='password'
              // antd 表单校验第二种方式
              rules={[{ validator }]}
            >
              <Input
                prefix={<LockOutlined className='form-icon' />}
                type='password'
                placeholder='密码: 111111'
              />
            </Form.Item>
          </TabPane>
          <TabPane tab='手机号登陆' key='phone'>
            <Form.Item
              name='phone'
              rules={[
                {
                  required: true,
                  message: '请输入手机号'
                },
                {
                  pattern: /^1[3456789]\d{9}$/,
                  message: '你输入不是手机号'
                }
              ]}
            >
              <Input
                prefix={<MobileOutlined className='form-icon' />}
                placeholder='手机号'
              />
            </Form.Item>

            <Row justify='space-between'>
              <Col span={16}>
                <Form.Item name='verify'>
                  <Input
                    prefix={<MailOutlined className='form-icon' />}
                    placeholder='验证码'
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Button
                  className='verify-btn'
                  onClick={getVerifyCode}
                  disabled={isShowDownCount}
                >
                  {isShowDownCount ? `${downCount}秒后获取` : '获取验证码'}
                </Button>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        <Row justify='space-between'>
          <Col span={7}>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>自动登陆</Checkbox>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Button type='link'>忘记密码</Button>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            登陆
          </Button>
        </Form.Item>
        <Form.Item>
          <Row justify='space-between'>
            <Col span={16}>
              <span>
                其他登陆方式
                <GithubOutlined className='login-icon' />
                <WechatOutlined className='login-icon' />
                <QqOutlined className='login-icon' />
              </span>
            </Col>
            <Col span={3}>
              <Button type='link'>注册</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  )
}

export default withRouter(
  connect(
    null,
    { login }
  )(LoginForm)
)
