import React, { useRef } from 'react'
import {useDispatch} from "react-redux"
import {addUser} from "../../../Slices/userSlice"
import {createChat} from "../../../Slices/chatSlice"

function SignUp() {
 const nameRef=useRef()
 const emailRef=useRef()
 const passwordRef=useRef()

 const dispatch=useDispatch()

 const handlaSignUp=()=>{

    const name=nameRef.current.value
    const email=emailRef.current.value
    const password=passwordRef.current.value

    dispatch(addUser({name,email,password}))

 }

  return (
    <div>
        <h1>Sign Up</h1>
        <button onClick={()=>{
          dispatch(createChat())
        }}></button>
        <input type="name" placeholder='name' ref={nameRef}/>
        <input type="email" placeholder='email'ref={emailRef}/>
        <input type="password" placeholder='password'ref={passwordRef}/>
        <button onClick={handlaSignUp}>Sign Up</button>
    </div>
  )
}

export default SignUp