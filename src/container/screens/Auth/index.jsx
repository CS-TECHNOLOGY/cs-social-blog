import React, { useState } from "react";
import githubIcon from "./github.svg";
import { useDispatch } from "react-redux";
import { validateValue } from "container/common/utils";
import { loginService, signUpService } from "redux/services";
import { useHistory, useParams } from "react-router";
const AuthScreen = () => {
  const [userInfo, setUserInfo] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "", 
  });
  const [verify, setVerify] = useState({
    email: false,
    password: false,
  });
  const [errMess, setErrMess] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { type, from } = useParams();
  const handleChange = (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
    checkVerify(event);
  };
  const submitAuth = (e) => {
    e.preventDefault();
    let body = {
      email: userInfo.email,
      password: userInfo.password,
      callback: (success) => {
        if (success === true) {
          if (from) {
            history.push(`/forum/${from}`);
          } else {
            history.push("/welcome");
          }
        } else {
          setErrMess(success);
        }
      },
    };
    if (type === "sign-in") {
      dispatch(loginService(body));
    } else if (type === "sign-up") {
      body.last_name = userInfo.lastName;
      body.first_name = userInfo.firstName;
      dispatch(signUpService(body));
    }
  };
  const checkVerify = (event) => {
    let test = validateValue(event.target.value, event.target.name);
    setVerify({
      ...verify,
      [event.target.name]: test,
    });
  };
  return (
    <div className="cs-auth">
      <h2>CS Technology</h2>
      <div className="container" id="container">
        <div
          className="form-container sign-in-container"
          hidden={type === "sign-in"}
        >
          <form>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="/" className="social">
                <img src={githubIcon} alt="" />
              </a>
              <a href="/" className="social">
                <img src={githubIcon} alt="" />
              </a>
              <a href="/" className="social">
                <img src={githubIcon} alt="" />
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>
        <div
          className="form-container sign-in-container"
          hidden={type === "sign-up"}
        >
          <form>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="/" className="social">
                <img src={githubIcon} alt="" />
              </a>
              <a href="/" className="social">
                <img src={githubIcon} alt="" />
              </a>
              <a href="/" className="social">
                <img src={githubIcon} alt="" />
              </a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="/">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            {type === "sign-in" ? (
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button
                  className="ghost"
                  id="signUp"
                  onClick={() => history.push("/auth/sign-up")}
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="overlay-panel overlay-right">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="ghost"
                  id="signIn"
                  onClick={() => history.push("/auth/sign-in")}
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
