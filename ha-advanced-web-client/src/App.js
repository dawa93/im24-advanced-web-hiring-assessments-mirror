import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import axios from "axios";

class App extends React.Component {
  state = {
    isLogin: false,
    userinfo: null,
  };

  handleResponseSuccess() {
    // TODO: 이제 인증은 성공했습니다. 사용자 정보를 호출하고, 이에 성공하면 로그인 상태를 바꿉시다.
    axios
      .get("http://localhost:4000/user")
      .then(({ data }) => {
        // console.log(data);
        this.setState({ userinfo: data, isLogin: true });
        this.props.history.push("/");
      })
      .catch((err) => console.log(err));
  }

  handleLogout = () => {
    axios.post("http://localhost:4000/signout").then((res) => {
      // console.log(res);
      this.setState({ isLogin: false, userinfo: null });
      this.props.history.push("/");
    });
  };

  render() {
    const { isLogin, userinfo } = this.state;

    return (
      <div>
        <Switch>
          <Route
            path="/login"
            render={() => (
              <Login
                isLogin={isLogin}
                userinfo={userinfo}
                handleResponseSuccess={this.handleResponseSuccess.bind(this)}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={() => (
              <Signup
                userinfo={userinfo}
                handleResponseSuccess={this.handleResponseSuccess.bind(this)}
              />
            )}
          />
          <Route
            exact
            path="/mypage"
            render={() => (
              <Mypage
                isLogin={isLogin}
                userinfo={userinfo}
                handleLogout={this.handleLogout}
              />
            )}
          />
          <Route
            path="/"
            render={() => {
              if (isLogin) {
                return <Redirect to="/mypage" />;
              }
              return <Redirect to="/login" />;
            }}
          />
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
