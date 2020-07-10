import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Tooltip,
  Alert,
  Table as AntdTable,
  Popover,
  Checkbox,
  Row,
  Col,
} from "antd";
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  RedoOutlined,
  SettingOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import screenfull from "screenfull";

import "./index.less";

const CheckboxGroup = Checkbox.Group;

class Table extends Component {
  static propTypes = {
    container: PropTypes.any,
    title: PropTypes.string,
    extra: PropTypes.array,
    selectedRowKeys: PropTypes.array,
    onSelectChange: PropTypes.func,
    onRefresh: PropTypes.func,
  };

  static defaultProps = {
    onSelectChange: () => {},
    onRefresh: () => {},
  };

  state = {
    isScreenfull: false,
    checkedList: [], // 选择列
    plainOptions: [], // 全部列
    indeterminate: false,
    checkAll: true,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const plainOptions = nextProps.columns.map((item) => item.title);

    for (let i = 0; i < plainOptions.length; i++) {
      const prevItem = prevState.plainOptions[i];
      const nextItem = plainOptions[i];

      if (prevItem !== nextItem) {
        return {
          checkedList: plainOptions,
          plainOptions,
        };
      }
    }

    return null;
  }

  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? this.state.plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  onCheckChange = (checkedList) => {
    const { plainOptions } = this.state;

    const isCheckAll = plainOptions.length === checkedList.length;

    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: isCheckAll,
    });
  };

  resetCheckbox = () => {
    const { plainOptions } = this.state;
    this.setState({
      checkedList: plainOptions,
      indeterminate: false,
      checkAll: true,
    });
  };

  screenFull = () => {
    const { container } = this.props;
    const { isScreenfull } = this.state;
    if (isScreenfull) {
      screenfull.exit();
    } else {
      // 注意是 container.current
      screenfull.request(container.current);
    }
  };

  screenfullChange = () => {
    const { isScreenfull } = this.state;
    this.setState({
      isScreenfull: !isScreenfull,
    });
  };

  componentDidMount() {
    screenfull.on("change", this.screenfullChange);
  }

  componentWillUnmount() {
    screenfull.off("change", this.screenfullChange);
  }

  render() {
    const {
      title,
      extra,
      selectedRowKeys,
      onSelectChange,
      onRefresh,
      columns,
      ...props // 剩下所有属性
    } = this.props;

    const {
      isScreenfull,
      checkedList,
      checkAll,
      indeterminate,
      plainOptions,
    } = this.state;

    const btnsWidth = 80 + extra.length * 100;

    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };

    const popoverTitle = (
      <div className="popover-title">
        <Checkbox
          indeterminate={indeterminate}
          onChange={this.onCheckAllChange}
          checked={checkAll}
        >
          列展示
        </Checkbox>
        <a onClick={this.resetCheckbox}>重置</a> 
      </div>
    );

    const popoverContent = (
      <CheckboxGroup value={checkedList} onChange={this.onCheckChange}>
        <Row gutter={[0, 10]} style={{ width: 100 }}>
          {plainOptions.map((item) => {
            return (
              <Col key={item} span={24}>
                <Checkbox value={item}>{item}</Checkbox>
              </Col>
            );
          })}
        </Row>
      </CheckboxGroup>
    );

    const currentColumns = columns.filter(
      (item) => checkedList.indexOf(item.title) > -1
    );

    return (
      <div className="table-header-wrap">
        <div className="table-header">
          <h3>{title}</h3>
          <div className="table-header-btns" style={{ width: btnsWidth }}>
            {extra}
            <Tooltip title={isScreenfull ? "退出全屏" : "全屏"}>
              <span onClick={this.screenFull}>
                {isScreenfull ? (
                  <FullscreenExitOutlined />
                ) : (
                  <FullscreenOutlined />
                )}
              </span>
            </Tooltip>
            <Tooltip title="刷新">
              <RedoOutlined onClick={onRefresh} />
            </Tooltip>
            <Tooltip title="设置">
              <Popover
                title={popoverTitle}
                content={popoverContent}
                trigger="click"
                placement="bottomLeft"
              >
                <SettingOutlined />
              </Popover>
            </Tooltip>
          </div>
        </div>
        <Alert
          message={
            <span>
              <InfoCircleOutlined className="table-header-icon" />
              {`已选择 ${selectedRowKeys.length} 项`}
            </span>
          }
          type="info"
          className="table-alert"
        />
        <AntdTable
          {...props}
          columns={currentColumns}
          rowSelection={rowSelection}
        />
      </div>
    );
  }
}

export default Table;
