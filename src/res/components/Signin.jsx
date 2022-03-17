import React, { useState } from "react";
import UsappLogo from "@svg/UsappLogo.jsx";
import ChatCloudSignin from "@svg/ChatCloudSignin.jsx";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./Signin.scss";

const baseURL = "http://206.189.91.54/api/v1/";
const Signin = (
  {
    setAccessToken,
    setClient,
    setExpiry,
    setUID,
  }
) => {

  const [hasInputEmail, setHasInputEmail] = useState(false);
  const [hasInputPassword, setHasInputPassword] = useState(false);
  const navigate = useNavigate();

  // Input placeholder animation when focus
  const onChangeInput = (event) => {
    const target = event.target;
    if (target.name === "email") {
      if (event.target.value) setHasInputEmail(true);
      else setHasInputEmail(false);
    } else if (target.name === "password") {
      if (event.target.value) setHasInputPassword(true);
      else setHasInputPassword(false);
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.BASEURL}/auth/sign_in?`, {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((res) => {
        // use res headers here on the corresponding setters
        setAccessToken(res.headers["access-token"]);
        setClient(res.headers["client"]);
        setExpiry(res.headers["expiry"]);
        setUID(res.headers["uid"]);
        navigate("/chat");
      });
  };

  return (
    <main className="signin">
      <div className="left-column">
        <UsappLogo className="usapp-logo" />
        <ChatCloudSignin className="chat-cloud-signin" />
      </div>
      <div className="right-column">
        <h2 className="signin-heading">Sign in to Chat/Usap</h2>

        <form className="form-login" onSubmit={handleSignIn}>
          <div className="email-input">
            <input
              type="email"
              name="email"
              id="email"
              onChange={onChangeInput}
            />
            <label
              htmlFor="email"
              className={
                hasInputEmail ? "email-label input-focus-email" : "email-label"
              }
            >
              email
            </label>
          </div>
          <div className="password-input">
            <input
              type="password"
              name="password"
              id="password"
              onChange={onChangeInput}
            />
            <label
              htmlFor="password"
              className={
                hasInputPassword
                  ? "password-label input-focus-password"
                  : "password-label"
              }
            >
              password
            </label>
          </div>
          <button className="signin-btn">Sign in</button>
          <span className="no-account">
            no account?
            <Link to="/signup" className="create-account">
              create an account
            </Link>
          </span>
        </form>
      </div>
    </main>
  );
};

export default Signin;
