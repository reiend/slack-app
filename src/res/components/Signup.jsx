import React, { useState, useRef, useEffect } from "react";
import UsappLogo from "@svg/UsappLogo.jsx";
import ChatCloudSignup from "@svg/ChatCloudSignup.jsx";
import "./Signup.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Signup = ({
  setAccessToken,
  setClient,
  setExpiry,
  setUID,
}) => {

  const [hasInputFirstname, setHasInputFirstname] = useState(false);
  const [hasInputLastname, setHasInputLastname] = useState(false);
  const [hasInputEmailSignup, setHasInputEmailSignup] = useState(false);
  const [hasInputPasswordSignup, setHasInputPasswordSignup] = useState(false);
  const [hasInputPasswordRetype, setHasInputPasswordRetype] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const password = useRef({});
  password.current = watch("password", "");
  // Input placeholder animation when focus
  const onChangeInput = (event) => {
    const target = event.target;
    if (target.name === "firstname") {
      if (target.value) setHasInputFirstname(true);
      else setHasInputFirstname(false);
    } else if (target.name === "lastname") {
      if (target.value) setHasInputLastname(true);
      else setHasInputLastname(false);
    } else if (target.name === "email") {
      if (target.value) setHasInputEmailSignup(true);
      else setHasInputEmailSignup(false);
    } else if (target.name === "password") {
      if (target.value) setHasInputPasswordSignup(true);
      else setHasInputPasswordSignup(false);
    } else if (target.name === "password_retype") {
      if (target.value) setHasInputPasswordRetype(true);
      else setHasInputPasswordRetype(false);
    }
  };
  const handleSignUp = (data, e) => {
    e.preventDefault();

    axios
      .post(`${process.env.BASEURL}auth?`, {
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      })
      .then((res) => {
        setAccessToken(res.headers["access-token"]);
        setClient(res.headers["client"]);
        setExpiry(res.headers["expiry"]);
        setUID(res.headers["uid"]);

        localStorage.setItem("access-token", res.headers["access-token"]);
        localStorage.setItem("client", res.headers["client"]);
        localStorage.setItem("expiry", res.headers["expiry"]);
        localStorage.setItem("uid", res.headers["uid"]);

        navigate("/chat");

      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.errors.full_messages[0]);
          console.log(error.response.status);
          const errorMSG = error.response.data.errors.full_messages[0];
          toast(`${errorMSG}!`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          console.log(error.response.headers);
        }
      });
    navigate("/chat");
    toast(`Welcome!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    // setIsHiddentSpinner(true);
    // setIsHiddenRouteContainer(false);
  }, []);

  return (
    <main className="signup">
      <UsappLogo className="usapp-logo-signup" />
      <h2 className="signup-heading">Sign up to Chat/Usap</h2>
      <form className="form-signup" onSubmit={handleSubmit(handleSignUp)}>
        <div className="firstname">
          <label
            htmlFor="firstname"
            className={
              hasInputFirstname
                ? "firstname-label firstname-focus"
                : "firstname-label"
            }
          >
            firstname
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            {...register("firstname", {
              required: "This is required",
              maxLength: {
                value: 30,
                message: "Whoah there! too many characters!",
              },
            })}
            onChange={onChangeInput}
          />
          <p className="firstname-errors">{errors.firstname?.message}</p>
        </div>
        <div className="lastname">
          <label
            htmlFor="lastname"
            className={
              hasInputLastname
                ? "lastname-label lastname-focus"
                : "lastname-label"
            }
          >
            lastname
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            {...register("lastname", {
              required: "This is required",
              maxLength: {
                value: 30,
                message: "Whoah there! too many characters!",
              },
            })}
            onChange={onChangeInput}
          />
          <p className="lastname-errors">{errors.lastname?.message}</p>
        </div>
        <div className="email-signup">
          <label
            htmlFor="email-signup"
            className={
              hasInputEmailSignup
                ? "email-signup-label email-signup-focus"
                : "email-signup-label"
            }
          >
            email
          </label>
          <input
            type="email"
            name="email_signup"
            id="email-signup"
            {...register("email", { required: "an email is required" })}
            onChange={onChangeInput}
          />
          <p className="email-errors">{errors.email?.message}</p>
        </div>
        <div className="password-signup">
          <label
            htmlFor="password-signup"
            className={
              hasInputPasswordSignup
                ? "password-signup-label password-signup-focus"
                : "password-signup-label"
            }
          >
            password
          </label>
          <input
            type="password"
            name="password_signup"
            id="password-signup"
            {...register("password", {
              required: "This is required",
              maxLength: {
                value: 30,
                message: "Whoah there! too many characters!",
              },
              minLength: {
                value: 8,
                message: "Password must at least have 8 characters",
              },
            })}
            onChange={onChangeInput}
          />
          <p className="password-errors">{errors.password?.message}</p>
        </div>
        <div className="password-retype">
          <label
            htmlFor="password-retype"
            className={
              hasInputPasswordRetype
                ? "password-retype-label password-retype-focus"
                : "password-retype-label"
            }
          >
            retype password
          </label>
          <input
            type="password"
            name="password_retype"
            id="password-retype"
            {...register("password_retype", {
              validate: (value) =>
                value === password.current || "The passwords do not match",
            })}
            onChange={onChangeInput}
          />
          <p className="password-retype-errors">
            {errors.password_retype?.message}
          </p>
        </div>
        <button type="submit" className="signup-btn">
          Sign up
        </button>
        <Link to="/" className="has-account">
          I have an account
        </Link>
        <ChatCloudSignup className="chat-cloud-signup" />
      </form>
    </main>
  );
};

export default Signup;
