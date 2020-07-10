import React, { Component } from "react";
import { List, Avatar, Tooltip } from "antd";
import { MessageOutlined, ReadOutlined } from "@ant-design/icons";

const IconText = ({ icon, text, title }) => (
  <Tooltip title={title}>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </Tooltip>
);

export default class Article extends Component {
  render() {
    const { courseList } = this.props;
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 5
        }}
        dataSource={courseList}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={ReadOutlined}
                text={Math.round(Math.random() * 900 + 100)}
                key="1"
                title="笔记数量"
              />,
              <IconText
                icon={MessageOutlined}
                text={Math.round(Math.random() * 900 + 100)}
                key="2"
                title="评论数量"
              />
            ]}
            extra={<img width={272} alt="logo" src={item.avatar} />}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    );
  }
}
