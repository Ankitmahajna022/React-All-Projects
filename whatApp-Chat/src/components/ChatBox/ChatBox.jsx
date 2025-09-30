import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeChat, createChat, chatFecht } from "../../Slices/chatSlice";
import "./ChatBox.css";

function ChatBox() {
  const dispatch = useDispatch();
  const { activeChat, chats } = useSelector((state) => state.chats);
  const [message, setMessage] = useState("");

  // load chats from firestore whenever chat opens
  useEffect(() => {
    if (activeChat) {
      dispatch(chatFecht());
    }
  }, [activeChat, dispatch]);

  if (!activeChat) return null;

  // handle send message
  const handleSend = () => {
    if (!message.trim()) return;

    dispatch(
      createChat({
        sender: "chats", // firestore collection name
        chats: {
          text: message,
          senderId: "me", // later replace with logged in user id
          receiverId: activeChat.id,
          createdAt: new Date().toISOString(),
        },
      })
    );

    setMessage(""); // clear input
  };

  return (
    <div className="chatbox">
      {/* Header */}
      <div className="chatbox-header">
        <h3>Chat with {activeChat.name}</h3>
        <button onClick={() => dispatch(closeChat())}>×</button>
      </div>

      {/* Messages */}
      <div className="chatbox-messages">
        {chats.length === 0 ? (
          <p className="no-msg">No messages yet...</p>
        ) : (
          chats.map((msg) => (
            <p
              key={msg.id}
              className={msg.senderId === "me" ? "my-message" : "their-message"}
            >
              {msg.text}
            </p>
          ))
        )}
      </div>

      {/* Input */}
      <div className="chatbox-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
