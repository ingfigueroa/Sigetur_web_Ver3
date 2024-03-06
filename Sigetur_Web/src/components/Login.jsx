import React, { Component } from "react";
// import "../css/login.css";
import Login1 from "./Login1";
import Login2 from "./Login2";
import Header from "./header";

export class Login extends Component {
  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div className="login">
          <Login1 />
          <Login2 />
        </div>
      </div>
    );
  }
}

export default Login;
