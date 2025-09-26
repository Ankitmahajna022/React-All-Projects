import React, { useRef } from 'react'
import { useDispatch } from "react-redux"
import { signInUser } from "../../../Slices/userSlice"
import { NavLink, useNavigate } from 'react-router-dom';
import "./SignIn.css"

function SignIn() {

  const dispatch = useDispatch();

  const navigate = useNavigate()

  // const {users,isLoding,error} = useSelector((state)=>state.users)
  const emailRef = useRef("");
  const passwrordRef = useRef("")

  const handleSignIn = () => {
    const email = emailRef.current.value
    const password = passwrordRef.current.value
    console.log("chek-1")

    dispatch(signInUser({ email, password }))

    navigate("/Home")

  }


  return (

    <div>
      <div className="signin-container">
        <h1>Sign In</h1>
        <input type="text" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwrordRef} />
        <button onClick={handleSignIn}>Submit</button>
        <NavLink to="/SignUp">Sign Up</NavLink>
      </div>

    </div>
  )
}

export default SignIn