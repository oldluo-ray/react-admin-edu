import React, { Component } from "react";
import { Chart, Geom, Tooltip } from "bizcharts";

export default class Bar extends Component {
  state = {
    numbers: []
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        numbers: [
          {
            year: "1951 年",
            sales: 38
          },
          {
            year: "1952 年",
            sales: 52
          },
          {
            year: "1956 年",
            sales: 61
          },
          {
            year: "1957 年",
            sales: 145
          },
          {
            year: "1958 年",
            sales: 48
          },
          {
            year: "1959 年",
            sales: 38
          },
          {
            year: "1960 年",
            sales: 38
          },
          {
            year: "1962 年",
            sales: 38
          },
          {
            year: "1964 年",
            sales: 52
          },
          {
            year: "1965 年",
            sales: 31
          },
          {
            year: "1967 年",
            sales: 38
          },
          {
            year: "1968 年",
            sales: 52
          },
          {
            year: "1969 年",
            sales: 31
          },
          {
            year: "1970 年",
            sales: 52
          },
          {
            year: "1972 年",
            sales: 61
          }
        ]
      });
    }, 1000);
  }

  render() {
    const { numbers } = this.state;

    const cols = {
      sales: {
        tickInterval: 20
      }
    };

    return (
      <div>
        <Chart
          height={50}
          data={numbers}
          scale={cols}
          forceFit
          padding={["auto", "auto", 0, "auto"]}
        >
          <Tooltip crosshairs />
          <Geom type="interval" position="year*sales" />
        </Chart>
      </div>
    );
  }
}
