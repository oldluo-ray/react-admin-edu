// 上传视频逻辑比较复杂,所以自定义个组件,包裹antd中upload组件,那么对应的上传的逻辑都写在这个组件中
import React, { Component } from 'react'
import { Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import { reqGetQiniuToken } from '@api/edu/lesson'

const MAX_VIDEO_SIZE = 2 * 1024 * 1024
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
    const targetTime = Date.now() + expires * 1000
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
  handleCustomRequest = () => {
    console.log('上传了')
    console.log(this.state.uploadToken)
  }

  render() {
    return (
      <div>
        <Upload
          beforeUpload={this.handleBeforeUpload}
          customRequest={this.handleCustomRequest}
        >
          <Button>
            <UploadOutlined /> 上传视频
          </Button>
        </Upload>
      </div>
    )
  }
}
