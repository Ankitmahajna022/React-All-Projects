import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChat, chatFecht, deleteChat, editChat } from "../../Slices/chatSlice";
import "./ChatBox.css";

function ChatBox() {
  const dispatch = useDispatch();
  const { activeChat, chats } = useSelector((state) => state.chats);
  const { currentUser } = useSelector((state) => state.users);
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (activeChat && currentUser) {
      dispatch(chatFecht(activeChat.id));
    }
  }, [activeChat, currentUser, dispatch]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  const sendMessage = () => {
    if (!message.trim() || !currentUser) return;

    dispatch(
      createChat({
        chatId: activeChat.id,
        message: { senderId: currentUser.email, text: message },
      })
    ).then(() => setMessage(""));
  };

  const updateMessage = (id) => {
    if (!editText.trim()) return;
    dispatch(
      editChat({ chatId: activeChat.id, id, data: { text: editText } })
    );
    setEditId(null);
    setEditText("");
  };

  const removeMessage = (id) => {
    dispatch(deleteChat({ chatId: activeChat.id, id }));
  };

  if (!activeChat) return <div>Select a user to chat</div>;

  return (
    <div className="chat-box">
      <div className="chat-header">
        <h3>{activeChat.name}</h3>
      </div>

      <div className="chat-messages">
        {chats.map((c) => {
          const isCurrentUser = c.senderId === currentUser.email;
          const isEditing = editId === c.id;

          return (
            <div
              key={c.id}
              className={`msg-box ${isCurrentUser ? "right" : "left"}`}
              onDoubleClick={() => removeMessage(c.id)} //
              onClick={(e) => {
                e.stopPropagation();
                if (isCurrentUser) {
                  setEditId(c.id);
                  setEditText(c.text);
                }
              }}
            >
              {isEditing ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => updateMessage(c.id)}
                  onKeyDown={(e) => e.key === "Enter" && updateMessage(c.id)}
                  autoFocus
                />
              ) : (
                <span>{c.text}</span>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-box">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)|| setEditText(c.text)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} disabled={!message.trim()}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
