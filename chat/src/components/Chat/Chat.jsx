import React, { useEffect, useRef, useState } from 'react';
import "./Chat.css";
import { store } from '../../fireebase';
import { collection, addDoc, Timestamp, doc, deleteDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

function ChatView() {
  const msgRef1 = useRef("");
  const msgRef2 = useRef("");
  const [message, setMessage] = useState([]);

  // Send message for user-1
  const handleMessage1 = async () => {
    const msg = msgRef1.current.value.trim();
    if (msg !== "") {
      try {
        await addDoc(collection(store, "chats"), {
          msg,
          sender: "user-1",
          time: Timestamp.now(),
        });
        msgRef1.current.value = "";
      } catch (err) {
        alert("Can't send message: " + err.message);
      }
    }
  };

  // Send message for user-2
  const handleMessage2 = async () => {
    const msg = msgRef2.current.value.trim();
    if (msg !== "") {
      try {
        await addDoc(collection(store, "chats"), {
          msg,
          sender: "user-2",
          time: Timestamp.now(),
        });
        msgRef2.current.value = "";
      } catch (err) {
        alert("Can't send message: " + err.message);
      }
    }
  };

  // Delete message
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(store, "chats", id));
      alert("Message deleted!");
    } catch (err) {
      alert("Error deleting: " + err.message);
    }
  };

  // Listen for real-time updates
  useEffect(() => {
    const q = query(collection(store, "chats"), orderBy("time", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      }));
      setMessage(msgList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="chat-box">
        <div className="chat">
          {message.map((msg, index) => (
            <div
              key={index}
              onDoubleClick={() => {
                if (msg.sender === "user-1") {
                  handleDelete(msg.docId);
                  console.log(msg.docId);
                } else {
                  alert("You can't delete other's message!!");
                }
              }}
              className={`msg-box ${msg.sender === "user-1" ? "right" : "left"}`}
            >
              <span>{msg.msg}</span>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input type="text" ref={msgRef1} />
          <button onClick={handleMessage1}>Send</button>
        </div>
      </div>

    
      <div className="chat-box">
        <div className="chat">
          {message.map((msg, index) => (
            <div
              key={index}
              onDoubleClick={() => {
                if (msg.sender === "user-2") {
                  handleDelete(msg.docId);
                } else {
                  alert("You can't delete other's message!!");
                }
              }}
              className={`msg-box ${msg.sender === "user-2" ? "left" : "right"}`}
            >
              <span>{msg.msg}</span>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input type="text" ref={msgRef2} />
          <button onClick={handleMessage2}>Send</button>
        </div>
      </div>
    </>
  );
}

export default ChatView;
