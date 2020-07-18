import React, { Component } from 'react'

import { Card } from 'antd'

const tabListNoTitle = [
  {
    key: 'scales',
    tab: '销售量'
  },
  {
    key: 'visits',
    tab: '访问量'
  }
]

// 表示每一个页签对应正文要展示的内容
const contentListNoTitle = {
  scales: <p>销售量...</p>,
  visits: <p>访问量....</p>
}

export default class Scales extends Component {
  state = {
    activeKey: 'scales'
  }
  render() {
    return (
      <div>
        <Card
          style={{ width: '100%' }}
          // 表示标签页展示的标题
          tabList={tabListNoTitle}
          // 表示当前选中了哪一个标签页
          activeTabKey={this.state.activeKey}
          tabBarExtraContent={<a href='#'>More</a>}
          // 点击标签页的时候,会触发
          onTabChange={key => {
            console.log(key)
            // this.onTabChange(key, 'noTitleKey')
            this.setState({
              activeKey: key
            })
          }}
        >
          {contentListNoTitle[this.state.activeKey]}
        </Card>
      </div>
    )
  }
}
