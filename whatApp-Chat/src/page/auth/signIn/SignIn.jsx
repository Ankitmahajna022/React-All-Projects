import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { signInUser } from "../../../Slices/userSlice";
import { NavLink, useNavigate } from "react-router-dom";
import "./SignIn.css";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSignIn = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    dispatch(signInUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/Home");
      })
      .catch((err) => {
        alert("Login failed: " + err.message);
      });
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-container">
        <h1>Sign In</h1>
        <input type="text" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button onClick={handleSignIn}>Submit</button>
        <NavLink to="/SignUp">Sign Up</NavLink>
      </div>
    </div>
  );
}

export default SignIn;
