import React, { Component } from "react";
import { Spin } from "antd";
import { connect } from "react-redux";

import logo from "@assets/images/logo.png";
import "./index.less";

@connect((state) => ({ loading: state.loading }))
class Loading extends Component {
  render() {
    const { loading } = this.props;

    if (loading) {
      return (
        <div className="loading" style={{ display: loading ? "flex" : "none" }}>
          <h1>
            <img src={logo} alt="logo" />
            <span>硅谷后台管理系统</span>
          </h1>
          <p>百万谷粉为你推荐的后台管理系统</p>
          <Spin size="large" />
        </div>
      );
    }

    return this.props.children;
  }
}

export default Loading;
