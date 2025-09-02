import React, { useEffect, useRef, useState } from 'react';
import "./Chat.css";
import { store } from '../../fireebase';
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';

function ChatView() {
  const msgRef = useRef("");
  const [message, setMessage] = useState([]);

  const handleMessage = () => {
    const msg = msgRef.current.value;
    if (msg!== "") {
      addDoc(collection(store, "chats"), {
        msg: msg.trim(),
        time: Timestamp.now(),
      })
        .then(() => {
          msgRef.current.value = ""; 
          handleGetMessage();        
        })
        .catch((err) => alert("Can't send message: " + err.message));
    }
  };

  const handleGetMessage = async () => {
    const querySnapshot = await getDocs(collection(store, "chats"));
    let msgList = querySnapshot.docs.map((doc) => doc.data());


    msgList.sort((a, b) => a.time.seconds - b.time.seconds);

    setMessage(msgList);
  };

  useEffect(() => {
    handleGetMessage();
  }, []);

  return (
    <div className="chat-box">
      <div className="chat">
        {message.map((msg, index) => (
          <div key={index} className="msg-box">
            <span>{msg.msg}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input type="text" ref={msgRef} />
        <button onClick={handleMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatView;
