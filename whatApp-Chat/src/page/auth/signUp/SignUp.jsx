import React, { useRef } from 'react'
import {useDispatch} from "react-redux"
import {addUser} from "../../../Slices/userSlice"

function SignUp() {
 const nameRef=useRef()
 const emailRef=useRef()
 const passwordRef=useRef()

//const currentUser = useSelector((state) => state.users.currentUser);


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
        
        <input type="name" placeholder='name' ref={nameRef}/>
        <input type="email" placeholder='email'ref={emailRef}/>
        <input type="password" placeholder='password'ref={passwordRef}/>
        <button onClick={handlaSignUp}>Sign Up</button>
    </div>
  )
}

export default SignUp