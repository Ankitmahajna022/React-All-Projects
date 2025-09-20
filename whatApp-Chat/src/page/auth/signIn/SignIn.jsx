import React,{ useRef } from 'react'
import {useDispatch} from "react-redux"
import {signInUser} from "../../../Slices/userSlice"

function SignIn() {

 const dispatch= useDispatch();

// const {users,isLoding,error} = useSelector((state)=>state.users)
const emailRef=useRef("");
  const passwrordRef=useRef("")

 const handleSignIn=()=>{
  const email=emailRef.current.value
  const password=passwrordRef.current.value
  console.log("chek-1")

  dispatch(signInUser({email,password}))
 }

  
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