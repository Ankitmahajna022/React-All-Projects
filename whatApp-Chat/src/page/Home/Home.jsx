import React from 'react'
import User from '../../components/User/User'
import ChatBox from '../../components/ChatBox/ChatBox'
import "./Home.css"


function Home() {
  return (
    <div className='main'>
      <div className='user'>
         <User/>
      </div>
       <div className='chatBox'>
         <ChatBox/>
       </div>
       
    </div>
  )
}

export default Home