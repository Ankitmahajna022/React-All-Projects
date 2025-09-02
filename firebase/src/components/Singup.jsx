import React, { useState } from 'react'
import {app} from "../firebase"
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth"

 const auth =getAuth(app)
function Singup() {
    const [email,setEmail]=useState(" ")
    const [password,setPassword]=useState(" ")

    const handleSignUp=()=>{
        createUserWithEmailAndPassword(auth,email,password).
        then((value)=>alert("user created successfully ..."))
        .catch((err)=>alert("user creation failed " + err))
    }
   
  return (
    <div>
        <h2>Sign UP</h2>
        <input type="email" onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={handleSignUp}>Sign Up</button>
    </div>
  )
}

export default Singup