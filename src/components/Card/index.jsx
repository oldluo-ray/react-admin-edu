import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tooltip, Divider, Skeleton } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import "./index.less";

export default class Card extends Component {
  static propTypes = {
    title: PropTypes.object.isRequired,
    loading: PropTypes.bool,
  };

  static defaultProps = {
    loading: false,
  };

  render() {
    const { title, footer, children, loading } = this.props;

    return (
      <div className="card">
        <Skeleton
          loading={loading}
          active
          title={{ width: "100%" }}
          paragraph={{ rows: 4, width: "100%" }}
        >
          <div className="card-header">
            {title}
            <Tooltip title="指标说明">
              <QuestionCircleOutlined className="card-icon" />
            </Tooltip>
          </div>
          <div className="card-content">{children}</div>
          {footer && (
            <>
              <Divider style={{ margin: "10px 0" }} />
              <div className="card-footer">{footer}</div>
            </>
          )}
        </Skeleton>
      </div>
    );
  }
}
