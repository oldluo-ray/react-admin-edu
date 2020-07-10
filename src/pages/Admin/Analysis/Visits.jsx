import React, { Component } from "react";
import { Chart, Geom, Tooltip } from "bizcharts";
import DataSet from "@antv/data-set";

class Visits extends Component {
  state = {
    visits: []
  };

  componentDidMount() {
    setTimeout(() => {
      const visits = [];
      let year = 1986;

      for (let i = 0; i < 10; i++) {
        visits.push({
          year: year++,
          ACME: Math.round(Math.random() * 100 + 100)
        });
      }

      this.setState({
        visits
      });
    }, 1000);
  }

  render() {
    const { visits } = this.state;

    const dv = new DataSet.View().source(visits);

    dv.transform({
      type: "fold",
      fields: ["ACME"] // 展示的key
      // key: "type",
      // value: "value"
    });

    const scale = {
      value: {
        alias: "访问量"
      },
      year: {
        range: [0, 1]
      }
    };

    return (
      <Chart
        data={dv}
        padding={["auto", "auto", 0, "auto"]}
        forceFit={true}
        scale={scale}
        height={50}
      >
        <Tooltip showTitle={false} crosshairs />
        <Geom
          type="area"
          position="year*value"
          color="#531dab"
          shape="smooth"
        />
      </Chart>
    );
  }
}

export default Visits;
