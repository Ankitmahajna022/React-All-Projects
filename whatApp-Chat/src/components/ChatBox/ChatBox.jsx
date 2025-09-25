import React from "react";
import "./ChatBox.css";

function ChatBox() {
  
 

  return (
    <div>
    <div className="chatbox">
    
      <div className="chatbox-header">
        <h3>Chat Room</h3>
      </div>

      
      <div className="chatbox-messages">
        
         <p>Hello</p>
          </div>
    
      </div>

      
      <div className="chatbox-input">
        <input
          type="text" placeholder="Type a message..."/>
        <button>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
