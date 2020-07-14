// 上传视频逻辑比较复杂,所以自定义个组件,包裹antd中upload组件,那么对应的上传的逻辑都写在这个组件中
import React, { Component } from 'react'
import { Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const MAX_VIDEO_SIZE = 20 * 1024 * 1024
export default class MyUpload extends Component {
  //上传视频之前调用
  handleBeforeUpload = (file, fileList) => {
    // file就是我们要上传的文件
    // console.log(file)

    return new Promise((resolve, reject) => {
      // 在上传视频之前要做的两件事
      // 1. 限制视频大小
      // 比如要限制的视频大小是20m
      // MAX_VIDEO_SIZE
      if (file.size > MAX_VIDEO_SIZE) {
        message.error('视频太大,不能超过20m')
        reject()
      }

      resolve(file)
    })

    // 2. 请求上传的token

    // return false
  }

  // 真正上传视频时调用, 这个函数会覆盖默认的上传方式
  handleCustomRequest = () => {}
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
