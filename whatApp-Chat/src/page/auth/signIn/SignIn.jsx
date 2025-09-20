import React,{ useRef } from 'react'
import {useDispatch,useSelector} from "react-redux"
import {signInUser} from "../../../Slices/userSlice"

function SignIn() {

 const dispatch= useDispatch();

 const {users,isLoding,error} = useSelector((state)=>state.users)

 const handleSignIn=()=>{
  const email=emailRef.current.value
  const password=passwrordRef.current.value

  dispatch(signInUser(email,password))
 }

  const emailRef=useRef("");
  const passwrordRef=useRef("")
  return (

    <div>
        <h1>Sign In</h1>

        <input type="text" ref={emailRef} />
        <input type="password" ref={passwrordRef}/>
        <button onClick={handleSignIn}> Submit</button>
    </div>
  )
}

export default SignIn