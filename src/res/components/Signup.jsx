import React, { useState } from "react";
import UsappLogo from "@svg/UsappLogo.jsx";
import ChatCloudSignup from "@svg/ChatCloudSignup.jsx";
import "./Signup.scss";
import axios from "axios";

const baseURL = "http://206.189.91.54/api/v1/";

const Signup = () => {
  // const [hasInputFirstname, setHasInputFirstname] = useState(false);
  // const [hasInputLastname, setHasInputLastname] = useState(false);
  // const [hasInputEmailSignup, setHasInputEmailSignup] = useState(false);
  // const [hasInputPasswordSignup, setHasInputPasswordSignup] = useState(false);
  // const [hasInputPasswordRetype, setHasInputPasswordRetype] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // Input placeholder animation when focus
  // const onChangeInput = (event) => {
  //   const target = event.target;
  //
  //   if (target.name === "firstname") {
  //     if (target.value) setHasInputFirstname(true);
  //     else setHasInputFirstname(false);
  //   } else if (target.name === "lastname") {
  //     if (target.value) setHasInputLastname(true);
  //     else setHasInputLastname(false);
  //   } else if (target.name === "email-signup") {
  //     if (target.value) setHasInputEmailSignup(true);
  //     else setHasInputEmailSignup(false);
  //   } else if (target.name === "password-signup") {
  //     if (target.value) setHasInputPasswordSignup(true);
  //     else setHasInputPasswordSignup(false);
  //   } else if (target.name === "password-retype") {
  //     if (target.value) setHasInputPasswordRetype(true);
  //     else setHasInputPasswordRetype(false);
  //   }
  // };

  const handleSignUp = (e) => {
    e.preventDefault();

    axios
      .post(`${baseURL}auth?`, {
        email: email,
        password: password,
        password_confirmation: confirmPass,
      })
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <main className="signup">
      <UsappLogo className="usapp-logo-signup" />
      <h2 className="signup-heading">Sign up to Chat/Usap</h2>
      <form className="form-signup" onSubmit={handleSignUp}>
        <div className="firstname">
          <label
            htmlFor="firstname"
            // className={
            //   hasInputFirstname
            //     ? "firstname-label firstname-focus"
            //     : "firstname-label"
            // }
          >
            firstname
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="lastname">
          <label
            htmlFor="lastname"
            // className={
            //   hasInputLastname
            //     ? "lastname-label lastname-focus"
            //     : "lastname-label"
            // }
          >
            lastname
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="email-signup">
          <label
            htmlFor="email-signup"
            // className={
            //   hasInputEmailSignup
            //     ? "email-signup-label email-signup-focus"
            //     : "email-signup-label"
            // }
          >
            email
          </label>
          <input
            type="email"
            name="email-signup"
            id="email-signup"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="password-signup">
          <label
            htmlFor="password-signup"
            // className={
            //   hasInputPasswordSignup
            //     ? "password-signup-label password-signup-focus"
            //     : "password-signup-label"
            // }
          >
            password
          </label>
          <input
            type="password"
            name="password-signup"
            id="password-signup"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="password-retype">
          <label
            htmlFor="password-retype"
            // className={
            //   hasInputPasswordRetype
            //     ? "password-retype-label password-retype-focus"
            //     : "password-retype-label"
            // }
          >
            retype password
          </label>
          <input
            type="password"
            name="password-retype"
            id="password-retype"
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </div>
        <button type="submit" className="signup-btn">
          Sign up
        </button>
        <ChatCloudSignup className="chat-cloud-signup" />
      </form>
    </main>
  );
};

export default Signup;
