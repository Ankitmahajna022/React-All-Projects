import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeChat } from "../../Slices/chatSlice";
import "./ChatBox.css";

function ChatBox() {
  const activeChat = useSelector((state) => state.chats.activeChat); 
  const dispatch = useDispatch();

  if (!activeChat) return null; // if no chat is selected, don't render

  return (
    <div className="chatbox">
      {/* Header */}
      <div className="chatbox-header">
        <h3>Chat with {activeChat.name}</h3>
        <button onClick={() => dispatch(closeChat())}>×</button>
      </div>

      {/* Messages */}
      <div className="chatbox-messages">
        <p>Hello {activeChat.name} 👋</p>
        {/* Later you’ll map through messages here */}
      </div>

      {/* Input */}
      <div className="chatbox-input">
        <input type="text" placeholder="Type a message..." />
        <button>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
