import React from "react";
import { CopyrightOutlined } from "@ant-design/icons";

import logo from "@assets/images/logo.png";
import LoginForm from "./LoginForm";

import "./index.less";

export default function Login() {
  return (
    <div className="login">
      <div>
        <div className="login-header">
          <img src={logo} alt="logo" />
          <h1>硅谷教育管理系统</h1>
        </div>
        <div className="login-form">
          <LoginForm></LoginForm>
        </div>
        <div className="login-footer">
          <span>尚硅谷</span>
          <span>
            Copyright
            <CopyrightOutlined className="copyright" />
            2020 硅谷前端技术部出品
          </span>
        </div>
      </div>
    </div>
  );
}
