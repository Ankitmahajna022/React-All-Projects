import React, { useRef } from 'react'
import { useDispatch } from "react-redux"
import { addUser } from "../../../Slices/userSlice"
import { createChat } from "../../../Slices/chatSlice"
import { useNavigate } from 'react-router-dom'
import "./SignUp.css"

function SignUp() {
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

const navigate=useNavigate()
  const dispatch = useDispatch()

  const handlaSignUp = () => {

    const name = nameRef.current.value
    const email = emailRef.current.value
    const password = passwordRef.current.value

    dispatch(addUser({ name, email, password }))
   navigate("/Home")

  }

  return (
  
    <div className="signup-container">
      <div className="signup-box">
        <h1>Sign Up</h1>
        <input type="text" placeholder="Name" ref={nameRef} />
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />

        <button onClick={handlaSignUp}>Sign Up</button>
      </div>
    </div>
  )
}

export default SignUp