import React, { useRef } from 'react';
import { useDispatch } from "react-redux";
import { addUser } from "../../../Slices/userSlice";
import { useNavigate } from 'react-router-dom';
import "./SignUp.css";

function SignUp() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = () => {
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    dispatch(addUser({ name, email, password }))
      .unwrap()
      .then(() => {
        navigate("/SignIn");
        nameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Sign Up</h1>
        <input type="text" placeholder="Name" ref={nameRef} />
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
}

export default SignUp;
