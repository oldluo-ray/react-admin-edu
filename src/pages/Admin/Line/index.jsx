import React, { Component } from "react";
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";
import DataSet from "@antv/data-set";
import Slider from "bizcharts-plugin-slider";
import dayjs from "dayjs";

export default class Line extends Component {
  state = {
    data: [],
    dv: []
  };

  randomData = () => {
    const data = [];

    let d = dayjs()
      .set("hour", 10)
      .set("minute", 0);

    for (let i = 0; i < 30; i++) {
      data.push({
        time: d.valueOf(),
        category: "客流量", // 1客流量 2支付笔数
        count: Math.round(Math.random() * 100 + 20)
      });

      data.push({
        // time: d.format("HH:mm"),
        time: d.valueOf(),
        category: "支付笔数", // 1客流量 2支付笔数
        count: Math.round(Math.random() * 100 + 20)
      });

      d = d.add(15, "minute");
    }

    return data;
  };

  componentDidMount() {
    const data = this.randomData();

    const ds = new DataSet({
      state: {
        start: data[0].time,
        end: data[data.length - 1].time
      }
    });

    const dv = ds.createView("origin").source(data);

    dv.transform({
      type: "filter",
      callback(obj) {
        const time = obj.time; // !注意：时间格式，建议转换为时间戳进行比较
        return time >= ds.state.start && time <= ds.state.end;
      }
    });

    this.setState({
      data,
      dv
    });

    this.ds = ds;
  }

  onChange = ({ startValue, endValue }) => {
    this.ds.setState("start", startValue);
    this.ds.setState("end", endValue);
  };

  render() {
    const { data, dv } = this.state;

    const cols = {
      time: {
        type: "time",
        formatter: time => {
          return dayjs(time).format("HH:mm");
        },
        tickCount: 8
      }
    };

    return (
      <div>
        <Chart
          height={400}
          data={dv}
          scale={cols}
          forceFit
          padding={[50, 80, 50, 80]}
        >
          <Legend position="top-center" />
          <Axis name="time" />
          <Axis name="count" />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom type="line" position="time*count" size={2} color={"category"} />
          <Geom
            type="point"
            position="time*count"
            size={4}
            shape={"circle"}
            color={"category"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>

        <Slider
          width="auto"
          height={26}
          start={data[0] && data[0].time}
          end={data[data.length - 1] && data[data.length - 1].time}
          xAxis="time"
          yAxis="count"
          padding={[50, 70, 50, 70]}
          scales={{
            time: {
              type: "time",
              formatter: time => {
                return dayjs(time).format("HH:mm");
              }
            }
          }}
          data={data}
          backgroundChart={{
            type: "line"
          }}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
