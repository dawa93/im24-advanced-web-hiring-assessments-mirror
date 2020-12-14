import React from "react";

function Mypage({ userinfo, isLogin, handleLogout }) {
  if (userinfo) {
    const { email, username, mobile } = userinfo;
    return (
      <div>
        <h1>Mypage</h1>
        <div className="username">{username}</div>
        <div className="email">{email}</div>
        <div className="mobile">{mobile}</div>
        <button className="btn-logout" onClick={handleLogout}>
          Log out
        </button>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Mypage;
