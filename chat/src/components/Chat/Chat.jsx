import React, { useEffect, useRef, useState } from 'react';
import "./Chat.css";
import { store } from '../../fireebase';
import { collection, addDoc, getDocs, Timestamp, doc, deleteDoc } from 'firebase/firestore';

function ChatView() {
  const msgRef1 = useRef("");
  const [message, setMessage] = useState([]);
  const msgRef2 = useRef("");

  const handleMessage1 = () => {
    const msg = msgRef1.current.value;
    if (msg !== "") {
      addDoc(collection(store, "chats"), {
        msg: msg.trim(),
        sender: "user-1",
        time: Timestamp.now(),
      })
        .then(() => {
          msgRef1.current.value = "";
          handleGetMessage();
        })
        .catch((err) => alert("Can't send message: " + err.message));
    }
    msgRef1.current.value = ""
  };

  const handleMessage2 = () => {
    const msg = msgRef2.current.value;
    if (msg !== "") {
      addDoc(collection(store, "chats"), {
        msg: msg.trim(),
        sender: "user-2",
        time: Timestamp.now(),
      })
        .then(() => {
          msgRef2.current.value = "";
          handleGetMessage();
        })
        .catch((err) => alert("Can't send message: " + err.message));
    }
    msgRef2.current.value = ""
  };

  const handleGetMessage = async () => {
    const querySnapshot = await getDocs(collection(store, "chats"));
    let msgList = querySnapshot.docs.map((doc) => {
      let data = doc.data();

      data = { ...data, docId: doc.id }
      console.log(data)
      return data

    });

    msgList.sort((a, b) => a.time.seconds - b.time.seconds);

    setMessage(msgList);
  };

  const handleDelete = (id) => {
    deleteDoc(doc(store, "chats", id)).then(() => {
      handleGetMessage();
      alert("message is delete....!")
    })
  }

  useEffect(() => {
    handleGetMessage();
  }, []);

  return (
    <>
      <div className="chat-box">
        <div className="chat">
          {message.map((msg, index) => (
            <div key={index} onDoubleClick={() => {
              if (msg.sender === "uesr-1") {
                handleDelete(msg.docId)
                console(msg.docId)
              }
              else {
                alert("you cant delete other's message !!")
              }

            }} className={`msg-box
            ${msg.sender === "user-1" ? "right" : "left "}`}>
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
            <div key={index} onDoubleClick={() => {
              if (msg.sender === "uesr-2") {
                handleDelete(msg.docId)
                console(msg.docId)
              }
              else {
                alert("you cant delete other's message !!")
              }

            }} className={`msg-box
            ${msg.sender === "user-2" ? "left" : "right "}`}>
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
 