import React, { Component } from 'react'

import { Card, Tabs } from 'antd'

import { RingProgressChart } from 'bizcharts'
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from 'bizcharts'

import './index.less'

const { TabPane } = Tabs

// 数据源
const data = [
  {
    month: 'Jan',
    city: 'Tokyo',
    temperature: 7
  },
  {
    month: 'Jan',
    city: 'London',
    temperature: 3.9
  },
  {
    month: 'Feb',
    city: 'Tokyo',
    temperature: 6.9
  },
  {
    month: 'Feb',
    city: 'London',
    temperature: 4.2
  },
  {
    month: 'Mar',
    city: 'Tokyo',
    temperature: 9.5
  },
  {
    month: 'Mar',
    city: 'London',
    temperature: 5.7
  },
  {
    month: 'Apr',
    city: 'Tokyo',
    temperature: 14.5
  },
  {
    month: 'Apr',
    city: 'London',
    temperature: 8.5
  },
  {
    month: 'May',
    city: 'Tokyo',
    temperature: 18.4
  },
  {
    month: 'May',
    city: 'London',
    temperature: 11.9
  },
  {
    month: 'Jun',
    city: 'Tokyo',
    temperature: 21.5
  },
  {
    month: 'Jun',
    city: 'London',
    temperature: 15.2
  },
  {
    month: 'Jul',
    city: 'Tokyo',
    temperature: 25.2
  },
  {
    month: 'Jul',
    city: 'London',
    temperature: 17
  },
  {
    month: 'Aug',
    city: 'Tokyo',
    temperature: 26.5
  },
  {
    month: 'Aug',
    city: 'London',
    temperature: 16.6
  },
  {
    month: 'Sep',
    city: 'Tokyo',
    temperature: 23.3
  },
  {
    month: 'Sep',
    city: 'London',
    temperature: 14.2
  },
  {
    month: 'Oct',
    city: 'Tokyo',
    temperature: 18.3
  },
  {
    month: 'Oct',
    city: 'London',
    temperature: 10.3
  },
  {
    month: 'Nov',
    city: 'Tokyo',
    temperature: 13.9
  },
  {
    month: 'Nov',
    city: 'London',
    temperature: 6.6
  },
  {
    month: 'Dec',
    city: 'Tokyo',
    temperature: 9.6
  },
  {
    month: 'Dec',
    city: 'London',
    temperature: 4.8
  }
]
const cols = {
  // 控制折线图,month数据的缩放 取值 0~1
  month: {
    range: [0, 1]
  }
}
export default class Static extends Component {
  render() {
    return (
      <div className='static'>
        <Card
          title={
            <Tabs
              // 设置默认选中页签, 值对应的是tabpane的key属性的值
              defaultActiveKey='1'
              // tabPosition 控制页签的方向 水平/垂直
              tabPosition={'top'}
              style={{ height: 600 }}
            >
              {[...Array(30).keys()].map(i => (
                //   tab属性,表示页签title展示的内容
                // disabled 禁用页签
                <TabPane
                  tab={
                    <>
                      <div>{`store-${i}`}</div>
                      <RingProgressChart
                        width={50}
                        height={50}
                        percent={Math.random()}
                      />
                    </>
                  }
                  key={i}
                  disabled={i === 28}
                >
                  {/* 这里展示每一个页签的折线图 */}
                  <Chart
                    height={400}
                    data={data}
                    scale={cols}
                    autoFit
                    padding='0'
                  >
                    <Legend position={'top'} />
                    <Axis name='month' />
                    <Axis
                      name='temperature'
                      // 提示文字
                      label={{
                        // 可以获取到当前temperature的值,返回一个拼接之后的值
                        formatter: val => `${val}°C`
                      }}
                    />
                    <Tooltip
                    //   showCrosshairs={true}
                    // 展示辅助线
                    // 需要配置showCrosshairs属性使用,值为true, crosshairs才生效
                    //   crosshairs={{
                    //     type: 'xy'
                    //   }}
                    />
                    {/* 通用图形组件 可以画线, 点 */}
                    <Geom
                      type='line' //表示线
                      position='month*temperature'
                      size={4} //线的粗细
                      color={'city'} // 数据中有两个城市,所有有两条不同颜色的线
                      shape={'smooth'} //是否有弧线
                      style={{
                        stroke: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff'
                        // lineWidth: 10 线的宽度
                      }}
                    />
                    <Geom
                      type='point' // 表示点
                      position='month*temperature'
                      size={4}
                      shape={'circle'} //表示点 是一个圆形的点
                      color={'city'} //有两个城市,所以两种颜色的点
                    />
                  </Chart>
                </TabPane>
              ))}
            </Tabs>
          }
        ></Card>
      </div>
    )
  }
}
