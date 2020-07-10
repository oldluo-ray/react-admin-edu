import React, { Component } from "react";

import { connect } from "react-redux";

import PrimaryLayout from "./PrimaryLayout";
import PublicLayout from "./PublicLayout";
import { Authorized } from "../components/Authorized";

@connect((state) => ({ token: state.token }))
class BasicLayout extends Component {
  render() {
    const { token } = this.props;

    if (token) {
      // render props技术
      // 提供一个B组件渲染到A组件内部，并传入props
      return (
        <Authorized
          render={(routes) => {
            return <PrimaryLayout routes={routes} />;
          }}
        />
      );
    }

    return <PublicLayout />;
  }
}

export default BasicLayout;
