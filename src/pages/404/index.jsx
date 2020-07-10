import React, { Component } from "react";
import { connect } from "react-redux";
import { Result, Button } from "antd";

@connect((state) => ({ token: state.token }))
class NotFound extends Component {
  goPage = () => {
    this.props.history.push(this.props.token ? "/" : "/login");
  };

  render() {
    const { token } = this.props;

    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={this.goPage}>
            {token ? "去首页" : "去登陆"}
          </Button>
        }
      />
    );
  }
}

export default NotFound;
