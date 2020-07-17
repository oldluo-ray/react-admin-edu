import React, { Component } from "react";

import Analysis from "./Analysis";
import Monitor from "./Monitor";
import Search from "./Search";
import Statistics from "./Statistics";

export default class Admin extends Component {
  render() {
    return (
      <div>
        <Analysis />
        {/* <Monitor />
        <Search />
        <Statistics /> */}
      </div>
    );
  }
}
