import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tooltip, Divider, Skeleton } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

import './index.less'

export default class Card extends Component {
  static propTypes = {
    title: PropTypes.object.isRequired,
    loading: PropTypes.bool
  }

  static defaultProps = {
    loading: false
  }

  render() {
    const { title, footer, children, loading } = this.props

    return (
      <div className='card'>
        <Skeleton
          // loading 控制skeleton 展示或隐藏 true就是展示, false隐藏
          loading={loading}
          active // 给骨架结构添加一个闪烁的效果
          title={{ width: '100%' }} // title 沾满父容器
          paragraph={{ rows: 3, width: '100%' }} //定义骨架内容 rows表示骨架内容有几条, width表示宽度
        >
          <div className='card-header'>
            {title}
            <Tooltip title='指标说明'>
              <QuestionCircleOutlined className='card-icon' />
            </Tooltip>
          </div>
          <div className='card-content'>{children}</div>
          {footer && (
            <>
              <Divider style={{ margin: '10px 0' }} />
              <div className='card-footer'>{footer}</div>
            </>
          )}
        </Skeleton>
      </div>
    )
  }
}
