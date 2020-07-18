import React, { Component } from 'react'

import { Card, Radio } from 'antd'

import {
  Chart,
  registerShape,
  Geom,
  Axis,
  Tooltip,
  Interval,
  Interaction,
  Coordinate,
  Legend
} from 'bizcharts'

import './index.less'

const data = [
  {
    type: '分类一',
    value: 20
  },
  {
    type: '分类二',
    value: 18
  },
  {
    type: '分类三',
    value: 32
  },
  {
    type: '分类四',
    value: 15
  },
  {
    type: 'Other',
    value: 15
  }
]

// 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
const sliceNumber = 0.01

// 自定义 other 的图形，增加两条线
registerShape('interval', 'sliceShape', {
  draw(cfg, container) {
    const points = cfg.points
    let path = []
    path.push(['M', points[0].x, points[0].y])
    path.push(['L', points[1].x, points[1].y - sliceNumber])
    path.push(['L', points[2].x, points[2].y - sliceNumber])
    path.push(['L', points[3].x, points[3].y])
    path.push('Z')
    path = this.parsePath(path)
    return container.addShape('path', {
      attrs: {
        fill: cfg.color,
        path: path
      }
    })
  }
})

export default class Search extends Component {
  handleRadioChange = e => {
    console.log(e)
  }
  render() {
    const extra = (
      <>
        <Radio.Group defaultValue='all' onChange={this.handleRadioChange}>
          <Radio.Button value='all'>全部渠道</Radio.Button>
          <Radio.Button value='online'>线上</Radio.Button>
          <Radio.Button value='offline'>门店</Radio.Button>
        </Radio.Group>
      </>
    )
    return (
      <div className='search'>
        <Card title='销售额类型占比' extra={extra}>
          {/* bizcharts里面所有的图标的根组件 
            data就是数据源
          */}
          <Chart data={data} height={500} autoFit>
            {/* 
              坐标系组件
              type: 坐标系类型
              radius: 坐标系整体半径  值 0~1
              innerRadius: 环内半径  值 0~1
            */}
            <Coordinate type='theta' radius={0.8} innerRadius={0.75} />
            <Axis visible={false} />

            {/* 鼠标移动到图表上之后,展示的提示文字. 默认会展示title和内容
            showTitle 值为false, 表示不展示title
            如果把Tooltip注释掉,也会展示提示信息,并且有title,如何不提示?
            利用自定义Tooltip 返回一个null
            
            
            
            */}
            <Tooltip showTitle={false}>
              {(title, items) => {
                // console.log(title, items)
                // items 是个数组，即被触发tooltip的数据。
                // 获取items的颜色
                const color = items[0].color
                // return <div>自定义tooltip</div>
                return (
                  <div class='tooltip'>
                    <span
                      className='dot'
                      style={{ backgroundColor: color }}
                    ></span>
                    <span style={{ marginRight: 5 }}>{title}</span>
                    <span>{items[0].value}</span>
                  </div>
                )
              }}
            </Tooltip>
            {/* 饼图的主体组件 */}
            <Interval
              adjust='stack' // 图表的样式
              position='value' // 设置图标依据的值
              color='type' //根据数据定义颜色
              shape='sliceShape' // 图标的展示的形式
            />
            {/* 交互效果 */}
            <Interaction type='element-single-selected' />
            {/* 图例组件 */}
            <Legend position='right'></Legend>
          </Chart>
        </Card>
      </div>
    )
  }
}
