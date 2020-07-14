// 上传视频逻辑比较复杂,所以自定义个组件,包裹antd中upload组件,那么对应的上传的逻辑都写在这个组件中
import React, { Component } from 'react'
import { Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import { reqGetQiniuToken } from '@api/edu/lesson'

import * as qiniu from 'qiniu-js'
import { nanoid } from 'nanoid'

const MAX_VIDEO_SIZE = 20 * 1024 * 1024
export default class MyUpload extends Component {
  // 定义构造函数
  // 构造函数中只是从缓存中获取数据/定义状态
  constructor() {
    super()

    // 一进来要从缓存中获取有没有token
    const str = localStorage.getItem('upload_token')

    if (str) {
      // 如果是有内容的字符串,说明之前存储过token
      // 这里没有必要判断token是否已经过期,只需要把从缓存中拿到的值,赋值给state就可以
      // 把缓存中字符串拿到,转成对象 对象中有uploadToken, expires
      const res = JSON.parse(str)
      this.state = {
        expires: res.expires,
        uploadToken: res.uploadToken
      }
    } else {
      // 没有内容 undefined, 没有存储过
      this.state = {
        expires: 0,
        uploadToken: ''
      }
    }
  }

  //   state = {
  //     uploadToken: '',
  //     expires: 0
  //   }
  //上传视频之前调用
  handleBeforeUpload = (file, fileList) => {
    // file就是我们要上传的文件
    // console.log(file)

    return new Promise(async (resolve, reject) => {
      // 在上传视频之前要做的两件事
      // 1. 限制视频大小
      // 比如要限制的视频大小是20m
      // MAX_VIDEO_SIZE
      if (file.size > MAX_VIDEO_SIZE) {
        message.error('视频太大,不能超过20m')
        reject('视频太大,不能超过20m')
        // 如果视频过大,后面的代码不执行
        return
      }

      // 2. 请求上传的token
      //   const res = await reqGetQiniuToken()
      //   console.log(res)
      //判断本地缓存中是否有token,如果有,判断是否过期,如果过期了,重新获取,如果没有过期,就不发送请求

      //   //从缓存中获取存储的数据
      //   const str = localStorage.getItem('upload_token')

      //   // 如果str有值,说明之前缓存过.如果没有,说明之前没有请求过token,直接去请求
      //   if (!str) {
      //     this.saveUploadToken()
      //   } else {
      //     // 把json格式的字符串,转成一个对象
      //     const uploadObj = JSON.parse(str)

      //     // 判断token是否过期  token有效期是 7200
      //     //   注意: 返回的expires 是秒数,需要编程毫秒数进行判断
      //     // 如何判断有没有超时:
      //     // 1. 拿到当前时间
      //     //   Date.now()
      //     // 2. 拿到存储token的过期目标时间
      //     //  uploadObj.expires
      //     // 3.进行比较
      //     if (Date.now() > uploadObj.expires) {
      //       // 过期了,重新发送请求
      //       this.saveUploadToken()
      //     }
      //   }

      //在请求之前,只需要判断token是否过期
      if (Date.now() > this.state.expires) {
        //过期了就要重新获取
        const { uploadToken, expires } = await reqGetQiniuToken()

        // 将数据存储起来
        // state里面有最新的数据, 本地缓存中也是有最新的数据
        this.saveUploadToken(uploadToken, expires)
      }

      resolve(file)
    })
  }

  // 存储uploadToken和过期时间的方法
  saveUploadToken = (uploadToken, expires) => {
    //   1. 发送请求获取数据

    // console.log(res)
    //   2. 存储到本地缓存中
    // 注意: localStorage 里面不能直接存储对象,只能存字符串
    // 注意: expires 是秒数,并且是过期时间的周期值 7200只表示两个小时
    // 所以需要使用expires 换算一个过期的时间
    // 获取到token的时间 加上 时间周期 得到过期的目标时间
    // 注意: 七牛云创建token, 就已经开始计时. 当浏览器得到token的时候,可能时间已经过去很久了
    // 所以在计算目标过期时间的时候,要把刚才那段时间考虑进来
    // 实现: 在计算出来的目标时间的基础上,减去一段
    const targetTime = Date.now() + expires * 1000 - 2 * 60 * 1000
    expires = targetTime
    const upload_token = JSON.stringify({ uploadToken, expires })
    localStorage.setItem('upload_token', upload_token)
    //   3. 存储到state里面
    this.setState({
      uploadToken,
      expires
    })
  }

  // 真正上传视频时调用, 这个函数会覆盖默认的上传方式
  handleCustomRequest = value => {
    // console.log(value, value1)
    console.log(value)
    // console.log('上传了')
    // console.log(this.state.uploadToken)
    // 要上传的文件对象
    const file = value.file

    // key 新定义的文件名   尽可能不要重新
    const key = nanoid(10)

    // token 就是七牛云返回的token
    const token = this.state.uploadToken

    // putExtra 上传的额外配置项  可以配置上传文件的类型
    // 可以上传所有格式的视频
    // 后台限制上传文件的类型,不是视频,就不能上传成功
    const putExtra = {
      mimeType: 'video/*'
    }

    // config 配置项  可以控制上传到哪个区域
    const config = {
      region: qiniu.region.z2
    }

    const observable = qiniu.upload(file, key, token, putExtra, config)

    const observer = {
      next(res) {
        console.log(res)
        // 由于res.total是一个对象,并且又percent属性.所以可以展示进度条
        value.onProgress(res.total)
      },
      error(err) {
        // ...
        console.log(err)
        // 上传失败,调用onError, 会展示一个错误的样式
        value.onError(err)
      },
      complete: res => {
        // ...
        console.log(res)
        // 上传成功会调用. 展示一个上传成功的样式
        value.onSuccess(res)
        // 注意:解决视频上传成功,表单验证不通过的问题
        // 手动调用Form.Item传过来onChange方法,onChange方法中传入需要表单控制的数据
        // 未来要给本地服务器存储的实际上就是 上传视频成功的地址
        // 地址: 自己七牛云空间的域名 + 文件名
        this.props.onChange('http://qdcdb1qpp.bkt.clouddn.com/' + res.key)

        // console.log()
      }
    }

    this.subscription = observable.subscribe(observer) // 上传开始
  }

  // 如果组件卸载,上传取消
  componentWillUnmount() {
    // console.log(this)
    this.subscription && this.subscription.unsubscribe() // 上传取消
  }

  render() {
    return (
      <div>
        <Upload
          beforeUpload={this.handleBeforeUpload}
          customRequest={this.handleCustomRequest}
          // 前端控制上传视频的类型, 不是视频文件,就看不到
          accept='video/*'
        >
          <Button>
            <UploadOutlined /> 上传视频
          </Button>
        </Upload>
      </div>
    )
  }
}
