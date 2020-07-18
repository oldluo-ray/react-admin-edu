import React, { Component } from 'react'

import { Card, Button, DatePicker } from 'antd'

import moment from 'moment'

// 导入日期范围选择器
const { RangePicker } = DatePicker

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
    // 选中的页签
    activeKey: 'scales',
    // 实现按钮高亮
    activeBtn: 'day', // day 今日, week 本周, month 本月, year 本年

    // rangeDate 用于控制时间范围组件的值
    rangeDate: [moment(), moment()]
  }

  handleBtnClick = activeBtn => () => {
    // 计算范围时间
    let rangeDate
    switch (activeBtn) {
      case 'day':
        rangeDate = [moment(), moment()]
        break
      case 'week':
        rangeDate = [moment(), moment().add(1, 'w')]
        break
      case 'month':
        rangeDate = [moment(), moment().add(1, 'M')]
        break
      case 'year':
        rangeDate = [moment(), moment().add(1, 'y')]
        break
    }

    this.setState({
      activeBtn,
      rangeDate
    })
  }
  render() {
    let { activeBtn, rangeDate } = this.state
    const extra = (
      <>
        <Button
          type={activeBtn === 'day' ? 'link' : 'text'}
          onClick={this.handleBtnClick('day')}
        >
          今日
        </Button>
        <Button
          type={activeBtn === 'week' ? 'link' : 'text'}
          onClick={this.handleBtnClick('week')}
        >
          本周
        </Button>
        <Button
          type={activeBtn === 'month' ? 'link' : 'text'}
          onClick={this.handleBtnClick('month')}
        >
          本月
        </Button>
        <Button
          type={activeBtn === 'year' ? 'link' : 'text'}
          onClick={this.handleBtnClick('year')}
        >
          本年
        </Button>
        {/* 想要控制RangePicker里面展示什么范围,实际就是操作这个组件value的值 */}
        {/* value的值的规则: 
        
            value值应该是一个数组: []
            第一个参数: 范围的开始时间
            第二个参数: 范围的结束时间
            // 一般使用moment来定义事件
            今日 [moment(), moment()]
        */}
        <RangePicker value={rangeDate} />
      </>
    )

    return (
      <div>
        <Card
          style={{ width: '100%' }}
          // 表示标签页展示的标题
          tabList={tabListNoTitle}
          // 表示当前选中了哪一个标签页
          activeTabKey={this.state.activeKey}
          tabBarExtraContent={extra}
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
